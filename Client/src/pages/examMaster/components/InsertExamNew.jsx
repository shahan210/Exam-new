import { DialogClose } from "@radix-ui/react-dialog";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { DialogFooter } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import ClassSelect from "./ClassSelect";
import SubjectSelect from "./SubjectSelect";

export default function InsertExams() {
    const [exam, setExam] = useState();

    useEffect(() => {
        const form = new FormData();
        form.append("title", "GetExamDefinitionByCode");
        form.append("description", "Request Question By Code");
        form.append("ReqQuestionTestID", "0");
        // getExamDefinition(form);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setExam((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    console.log(exam);

    return (
        <>
            {" "}
            {
                <form className="flex flex-col px-3 py-1">
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="date">Exam Date</Label>
                            <Input
                                name="ExamDateStr"
                                // value={data[0].ExamDateStr}
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="examname">Exam Name</Label>
                            <Input
                                name="ExamName"
                                // value={data[0].ExamName}
                                className="w-64"
                                id="examname"
                                onChange={handleInputChange}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="examname">Exam Head</Label>
                            <Input
                                name="ExamHeading"
                                className="w-64"
                                id="examname"
                                // value={data[0].ExamHeading}
                                onChange={handleInputChange}
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="examname">Exam Sub Head</Label>
                            <Input
                                name="ExamSubHeading"
                                // value={data[0].ExamSubHeading}
                                className="w-64"
                                onChange={handleInputChange}
                                id="examname"
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="class">Select Class</Label>
                            <ClassSelect
                            // handleChange={(c) => {
                            //     const items = data[0];
                            //     setExam((prev) => ({
                            //         ...prev,
                            //         data: [
                            //             {
                            //                 ...items,
                            //                 ClassId: c,
                            //             },
                            //         ],
                            //     }));
                            // }}
                            // selected={data[0].ClassId}
                            />
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="subject">Select Subject</Label>
                            <SubjectSelect
                            // handleChange={(c) => {
                            //     const items = data[0];
                            //     setExam((prev) => ({
                            //         ...prev,
                            //         data: [
                            //             {
                            //                 ...items,
                            //                 SubjectID: c,
                            //             },
                            //         ],
                            //     }));
                            // }}
                            // selected={data[0].SubjectID}
                            />
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                    // value={data[0].ALTMTSec}
                                ></Input>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="button">
                            <Save className="mr-2 h-4 w-4" /> Submit
                        </Button>
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
