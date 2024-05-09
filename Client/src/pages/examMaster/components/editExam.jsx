/* eslint-disable react/prop-types */
import { Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { DialogFooter } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "react-toastify";
import getClassTable from "../../../API/classMaster/getClassTable";
import { getSubjectTable } from "../../../API/subjectMaster/getSubjectTable";
import createExamMaster from "../../../API/examMaster/createExamMaster";
import { formatDateForInput } from "../../../utils/helpers";
import getExamMasterInfo from "../../../API/examMaster/getExamMasterInfo";
// import { useLocation, useNavigate } from "react-router-dom";

export default function EditExam({ examId }) {
    // const location = useLocation();
    const id = examId;
    console.log(id,'iiiiiiiiiiiiiiid');
    // const navigate = useNavigate();

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
    const [examData, setExamData] = useState({
        ALTMTHour: "",
        ALTMTMin: "",
        ALTMTSec: "",
        AcaYear: "",
        AddedBy: "",
        AddedDate: "",
        ClassId: "",
        ExamDate: "",
        ExamHeading: "",
        ExamName: "",
        ExamSubHeading: "",
        ModifiedBy: "",
        ModifiedDate: "",
        QuestionTestID: "",
        SubjectID: "",
    });

    const fetchExamIdData = useCallback(async () => {
        try {
            const response = await getExamMasterInfo(id);
            const jsonData1 = response[0]?.[0]?.[0];
            if (response) {
                const data = jsonData1;
                // console.log(data,'data');
                setExamData({
                    ...examData,
                    AcaYear: data?.AcaYear || "",
                    AddedBy: data?.AddedBy || "",
                    ALTMTHour: data?.ALTMTHour || "",
                    AddedDate: data?.AddedDate || "",
                    ALTMTMin: data?.ALTMTMin || "",
                    ALTMTSec: data?.ALTMTSec || "",
                    ClassId: data?.ClassId || "",
                    ExamDate: formatDateForInput(data?.ExamDate) || "",
                    ExamHeading: data?.ExamHeading || "",
                    ExamName: data?.ExamName || "",
                    ExamSubHeading: data?.ExamSubHeading || "",
                    ModifiedBy: data?.ModifiedBy || "",
                    ModifiedDate: data?.ModifiedDate || "",
                    QuestionTestID: data?.QuestionTestID || "",
                    SubjectID: data?.SubjectID || "",
                });

                setInput({
                    ...input,
                    className: {
                        id: data?.ClassId,
                    },
                    subject: {
                        id: data?.SubjectID,
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching exam data:", error);
        }
    }, [id]);

    const fetchClassess = async () => {
        try {
            const result = await getClassTable();
            const filterClass = result[0]?.map((data) => ({
                id: data?.ClassId,
                name: data?.QstClass,
            }));

            setClassList(filterClass);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        } catch (error) {
            console.log(error);
            toast.error("error");
        }
    };

    const fetchSubjects = async () => {
        try {
            const result = await getSubjectTable();

            const filterClass = result[0]?.map((data) => ({
                id: data?.SubjectID,
                name: data?.SubjectName,
            }));
            setSubjectList(filterClass);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSubjects();
        fetchClassess();
        fetchExamIdData();
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
        console.log(input, "inputs");
        if (input.ExamName === "" || input.ExamHeading === "") return toast.warn("Please add exam name and heading");
        if (input.ALTMTHour === "" || input.ALTMTMin === "") return toast.warn("Please add time");
        if (input.ExamDateStr === "" || input.year === "") return toast.warn("Please add Date & Year");
        if (input.className.id === "" || input.subject.id === "") return toast.warn("Please select Class and Subject");

        try {
            const response = await createExamMaster(input);
            console.log(response, "reult");
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
                        <div className="flex items-center space-x-2 justify-evenly">
                            <Label className={`md:basis-1/2`} htmlFor="date">
                                Exam Date
                            </Label>
                            <Input
                                name="ExamDateStr"
                                // value={data[0].ExamDateStr}
                                type="date"
                                value={examData?.ExamDate}
                                onChange={(e) => setExamData({ ...examData, ExamDate: e.target.value })}
                                className="w-full md:basis-1/2"
                                id="date"
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-evenly">
                            <Label className={`md:basis-1/2`} htmlFor="year">
                                Year
                            </Label>
                            <Input
                                name="AcaYear"
                                // value={data[0].AcaYear === 0 ? session.data?.user.year : data[0].AcaYear}
                                className="w-full md:basis-1/2"
                                id="year"
                                value={examData?.AcaYear}
                                onChange={(e) => setExamData({ ...examData, AcaYear: e.target.value })}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-evenly">
                            <Label className={`md:basis-1/2`} htmlFor="examname">
                                Exam Name
                            </Label>
                            <Input
                                name="ExamName"
                                // value={data[0].ExamName}
                                className="w-full md:basis-1/2"
                                id="examname"
                                value={examData?.ExamName}
                                onChange={(e) => setExamData({ ...examData, ExamName: e.target.value })}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-evenly">
                            <Label className={`md:basis-1/2`} htmlFor="class">
                                Select Class
                            </Label>
                            <Select defaultValue={input.className.name} onValueChange={(v) => handleSelect(v, "class")}>
                                <SelectTrigger id="class" className="w-full md:basis-1/2">
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
                        <div className="flex items-center space-x-2 justify-evenly">
                            <Label className={`md:basis-1/2`} htmlFor="subject">
                                Select Subject
                            </Label>
                            <Select defaultValue={input.subject.name} onValueChange={(v) => handleSelect(v, "sub")}>
                                <SelectTrigger id="class" className="w-full md:basis-1/2">
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
                        <div className="flex items-center space-x-2 justify-evenly">
                            <Label className={`md:basis-1/2`} htmlFor="class">
                                Max Time
                            </Label>
                            <div className="flex w-full justify-evenly md:basis-1/2">
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
                                        defaultValue={examData.ALTMTHour}
                                        onChange={(e) => setExamData({ ...examData, ALTMTHour: e.target.value })}
                                        // value={data[0].ALTMTHour}
                                    ></Input>
                                </div>
                                <div className="flex">
                                    <div className="w-8 h-10 border-r-0  rounded-r-none bg-primary text-white text-sm text-center flex items-center justify-center">
                                        M
                                    </div>
                                    <Input
                                        className="w-14 rounded-none focus-visible:ring-0 "
                                        type="number"
                                        max={60}
                                        min={0}
                                        name="ALTMTMin"
                                        defaultValue={examData.ALTMTMin}
                                        onChange={(e) => setExamData({ ...examData, ALTMTMin: e.target.value })}
                                        // value={data[0].ALTMTMin}
                                    ></Input>
                                </div>
                                <div className="flex">
                                    <div className="w-8 h-10 border-r-0   bg-primary text-white text-sm text-center flex items-center justify-center">
                                        S
                                    </div>
                                    <Input
                                        className="w-14 border-l-0 rounded-l-none focus-visible:ring-0 "
                                        type="number"
                                        max={60}
                                        min={0}
                                        name="ALTMTSec"
                                        defaultValue={examData.ALTMTSec}
                                        onChange={(e) => setExamData({ ...examData, ALTMTSec: e.target.value })}
                                        // value={data[0].ALTMTSec}
                                    ></Input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit">
                            <Save className="mr-2 h-4 w-4" /> Submit
                        </Button>
                    </DialogFooter>
                </form>
            }
        </>
    );
}
