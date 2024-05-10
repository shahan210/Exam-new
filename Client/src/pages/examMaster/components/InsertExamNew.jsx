import { DialogClose } from "@radix-ui/react-dialog";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { DialogFooter } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "react-toastify";
import getClassTable from "../../../API/classMaster/getClassTable";
import { getSubjectTable } from "../../../API/subjectMaster/getSubjectTable";
import createExamMaster from "../../../API/examMaster/createExamMaster";

export default function InsertExams() {
    const [input, setInput] = useState({
        ExamDateStr: "",
        year: "",
        className: {
            name: "",
            id: "",
        },
        ExamName: "",
        ExamHeading: "",
        ExamSubHeading: "",
        ALTMTHour: "",
        ALTMTMin: "",
        ALTMTSec: "",
        subject: {
            name: "",
            id: "",
        },
        term: "",
    });
    const [loading, setLoading] = useState(true);

    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    const fetchClassess = async () => {
        try {
            setLoading(true);
            const result = await getClassTable();
            const filterClass = result[0]?.map((data) => ({
                id: data?.ClassId,
                name: data?.QstClass,
            }));

            setClassList(filterClass);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("error");
        }
    };

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const result = await getSubjectTable();

            const filterClass = result[0]?.map((data) => ({
                id: data?.SubjectID,
                name: data?.SubjectName,
            }));
            setSubjectList(filterClass);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSubjects();
        fetchClassess();
    }, []);

    const handleSelect = (v, val) => {
        if (val === "class") {
            const filterData = classList.filter((item) => item.name === v);
            setInput({
                ...input,
                className: {
                    id: filterData[0]?.id,
                    name: filterData[0]?.name,
                },
            });
        } else if (val === "sub") {
            const filterData = subjectList.filter((item) => item.name === v);
            setInput({
                ...input,
                subject: {
                    id: filterData[0]?.id,
                    name: filterData[0]?.name,
                },
            });
        }
    };

    useEffect(() => {
        const form = new FormData();
        form.append("title", "GetExamDefinitionByCode");
        form.append("description", "Request Question By Code");
        form.append("ReqQuestionTestID", "0");
        // getExamDefinition(form);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.ExamName === "" || input.ExamHeading === "") return toast.warn("Please add exam name and heading");
        if (input.ALTMTHour === "" || input.ALTMTMin === "") return toast.warn("Please add time");
        if (input.ExamDateStr === "" || input.year === "") return toast.warn("Please add Date & Year");
        if (input.className.id === "" || input.subject.id === "") return toast.warn("Please select Class and Subject");

        try {
            setLoading(true);
            const response = await createExamMaster(input);
            console.log(response, "reult");
            if (response) {
                toast.success("successfully Created");
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            toast.error(`${error}`);
            console.log(error);
        }
    };

    return (
        <>
            {
                <form onSubmit={handleSubmit} className="flex flex-col px-3 py-1">
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="date">Exam Date</Label>
                            <Input
                                name="ExamDateStr"
                                // value={data[0].ExamDateStr}
                                type="date"
                                value={input?.ExamDateStr}
                                onChange={(e) => setInput({ ...input, ExamDateStr: e.target.value })}
                                className="w-64"
                                id="date"
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="year">Year</Label>
                            <Input
                                name="AcaYear"
                                // value={data[0].AcaYear === 0 ? session.data?.user.year : data[0].AcaYear}
                                className="w-64"
                                id="year"
                                value={input?.year}
                                onChange={(e) => setInput({ ...input, year: e.target.value })}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="examname">Exam Name</Label>
                            <Input
                                name="ExamName"
                                // value={data[0].ExamName}
                                className="w-64"
                                id="examname"
                                value={input?.ExamName}
                                onChange={(e) => setInput({ ...input, ExamName: e.target.value })}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="examname">Exam Head</Label>
                            <Input
                                name="ExamHeading"
                                className="w-64"
                                id="examname"
                                // value={data[0].ExamHeading}
                                value={input?.ExamHeading}
                                onChange={(e) => setInput({ ...input, ExamHeading: e.target.value })}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="examname">Exam Sub Head</Label>
                            <Input
                                name="ExamSubHeading"
                                // value={data[0].ExamSubHeading}
                                className="w-64"
                                value={input?.ExamSubHeading}
                                onChange={(e) => setInput({ ...input, ExamSubHeading: e.target.value })}
                                id="examname"
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="class">Select Class</Label>
                            <Select defaultValue={input.className.name} onValueChange={(v) => handleSelect(v, "class")}>
                                <SelectTrigger id="class" className="w-64">
                                    <SelectValue placeholder={loading ? "Loading..." : "Choose Class"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {classList.length > 0 &&
                                        classList.map((c, ind) => (
                                            <SelectItem value={c.name} key={ind}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="subject">Select Subject</Label>
                            <Select defaultValue={input.subject.name} onValueChange={(v) => handleSelect(v, "sub")}>
                                <SelectTrigger id="class" className="w-64">
                                    <SelectValue placeholder={loading ? "Loading..." : "Choose Subject"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {subjectList.length > 0 &&
                                        subjectList.map((subject, ind) => (
                                            <SelectItem value={subject.name} key={ind}>
                                                {subject.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="class">Max Time</Label>
                            <div className="flex">
                                <div className="w-8 h-10 border-r-0 rounded-sm rounded-r-none bg-primary text-white text-sm text-center flex items-center justify-center">
                                    H
                                </div>
                                <Input
                                    className="w-14 rounded-none focus-visible:ring-0 "
                                    type="number"
                                    max={24}
                                    min={0}
                                    name="ALTMTHour"
                                    defaultValue={input.ALTMTHour}
                                    onChange={(e) => setInput({ ...input, ALTMTHour: e.target.value })}
                                    // value={data[0].ALTMTHour}
                                ></Input>
                                <div className="w-8 h-10 border-r-0  rounded-r-none bg-primary text-white text-sm text-center flex items-center justify-center">
                                    M
                                </div>
                                <Input
                                    className="w-14 rounded-none focus-visible:ring-0 "
                                    type="number"
                                    max={60}
                                    min={0}
                                    name="ALTMTMin"
                                    defaultValue={input.ALTMTMin}
                                    onChange={(e) => setInput({ ...input, ALTMTMin: e.target.value })}
                                    // value={data[0].ALTMTMin}
                                ></Input>
                                <div className="w-8 h-10 border-r-0   bg-primary text-white text-sm text-center flex items-center justify-center">
                                    S
                                </div>
                                <Input
                                    className="w-14 border-l-0 rounded-l-none focus-visible:ring-0 "
                                    type="number"
                                    max={60}
                                    min={0}
                                    name="ALTMTSec"
                                    defaultValue={input.ALTMTSec}
                                    onChange={(e) => setInput({ ...input, ALTMTSec: e.target.value })}
                                    // value={data[0].ALTMTSec}
                                ></Input>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" /> Submit
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="destructive">
                                <X className="mr-2 h-4 w-4" />
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            }
        </>
    );
}
