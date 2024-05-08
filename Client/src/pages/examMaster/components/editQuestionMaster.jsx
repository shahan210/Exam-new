/* eslint-disable no-unused-vars */
import Layout from "../../../global/components/Layout";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { useCallback, useEffect, useState } from "react";
import { getSubjectTable } from "../../../API/subjectMaster/getSubjectTable";
import getClassTable from "../../../API/classMaster/getClassTable";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import getExamMasterInfo from "../../../API/examMaster/getExamMasterInfo";
import { formatDateForInput } from "../../../utils/helpers";
import getQuizMasterEditInfo from "../../../API/examMaster/editQuestionMaster";
import updateQuesMaster from "../../../API/examMaster/updateQuesMaster";
import updateExamMaster from "../../../API/examMaster/updateExamMaster";

const EditQuestionMaster = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const examid = location.state.examId;
    const quizid = location.state.quizId;
    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
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
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const fetchExamIdData = useCallback(async () => {
        try {
            const response = await getExamMasterInfo(examid);
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
            }
        } catch (error) {
            console.error("Error fetching exam data:", error);
        }
    }, [examid]);

    useEffect(() => {
        if (examData.ClassId) {
            classList.filter((id) => id.id === examData.ClassId);
        }
    }, [examData]);

    const fetchQuizIdData = useCallback(async () => {
        try {
            const response = await getQuizMasterEditInfo(quizid);
            const quizInfo = response[0].JSONData1[0]?.[0]?.[0];

            const answerObjects = Object.entries(quizInfo)
                .filter(([key, _]) => key.startsWith("Answer"))
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

            setQuizData(quizInfo);
            setSelectedAnswer(quizInfo.RightAnswer);
            setAnswers(answerObjects);
        } catch (error) {
            console.error("Error fetching exam data:", error);
        }
    }, [quizid]);

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
        fetchQuizIdData();
    }, [fetchExamIdData, fetchQuizIdData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(quizData, "submission");
        console.log(examData, "submission");

        try {
            const [updateQues, updateExam] = await Promise.all([updateQuesMaster(quizData), updateExamMaster(examData)]);
            console.log(updateExam, "exam result");
            if (updateExam.length > 0 && updateQues.length > 0) {
                toast.success("successfully updated");
                navigate(-1);
            }
            console.log(updateQues, "ques result");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <>
                <div className="w-full">
                    <div className="flex justify-between">

                    <Button onClick={() => navigate(-1)}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <h3 className="font-semibold md:text-xl">Edit</h3>
                    </div>

                    <div className="w-full">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="examDate" className="text-md basis-1/4 font-semibold">
                                    Exam Name
                                </Label>
                                <Input
                                    type="text"
                                    value={examData?.ExamName}
                                    onChange={(e) => setExamData({ ...examData, ExamName: e.target.value })}
                                    className="md:basis-3/4 w-full"
                                    name="ExamDate"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="examDate" className="text-md basis-1/4 font-semibold">
                                    Exam Date
                                </Label>
                                <Input
                                    type="date"
                                    value={examData?.ExamDate}
                                    onChange={(e) => setExamData({ ...examData, ExamDate: e.target.value })}
                                    className="md:basis-3/4 w-full"
                                    name="ExamDate"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="year" className="text-md basis-1/4 font-semibold">
                                    Year
                                </Label>
                                <Input
                                    type="text"
                                    value={examData?.AcaYear}
                                    onChange={(e) => setExamData({ ...examData, AcaYear: e.target.value })}
                                    className="md:basis-3/4 w-full"
                                    name="Year"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label className="text-md basis-1/4 font-semibold" htmlFor="selectClass">
                                    Class
                                </Label>
                                <Select className="md:basis-3/4 w-full">
                                    <SelectTrigger id="class" className="md:basis-3/4 w-full">
                                        <SelectValue placeholder={loading ? "Loading..." : "Choose Class"} />
                                    </SelectTrigger>
                                    <SelectContent className="md:basis-3/4 w-full">
                                        {classList.length > 0 &&
                                            classList.map((c, ind) => (
                                                <SelectItem className="md:basis-3/4 w-full" value={c.name} key={ind}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-md basis-1/4 font-semibold" htmlFor="selectSubject">
                                    Subject
                                </Label>
                                <Select className="md:basis-3/4 w-full">
                                    <SelectTrigger className="md:basis-3/4 w-full" id="class">
                                        <SelectValue placeholder={loading ? "Loading..." : "Choose Subject"} />
                                    </SelectTrigger>
                                    <SelectContent className="md:basis-3/4 w-full">
                                        {subjectList.length > 0 &&
                                            subjectList.map((subject, ind) => (
                                                <SelectItem className="md:basis-3/4 w-full" value={subject.name} key={ind}>
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-between">
                                <Label htmlFor="question-title" className="text-md basis-1/4 font-semibold">
                                    Question Title
                                </Label>
                                <Input
                                    type="text"
                                    value={quizData?.Question1}
                                    onChange={(e) => setQuizData({ ...quizData, Question1: e.target.value })}
                                    id="question-title"
                                    className="md:basis-3/4 w-full"
                                    name="Question1"
                                />
                            </div>
                            <div className="flex justify-between">
                                <Label className="text-md basis-1/4 font-semibold">QuestionDesc01</Label>
                                <Input
                                    className="md:basis-3/4 w-full"
                                    value={quizData?.QuestionDesc01}
                                    onChange={(e) => setQuizData({ ...quizData, QuestionDesc01: e.target.value })}
                                    name="QuestionDesc01"
                                />
                            </div>
                            <div className="flex justify-between">
                                <Label className="text-md basis-1/4 font-semibold">QuestionDesc02</Label>
                                <Input
                                    value={quizData?.QuestionDesc02}
                                    onChange={(e) => setQuizData({ ...quizData, QuestionDesc02: e.target.value })}
                                    className="md:basis-3/4 w-full"
                                    name="QuestionDesc02"
                                />
                            </div>
                            <div className="border p-4 py-4 space-y-4 rounded-md">
                                <div className="flex flex-col gap-2">
                                    {answers?.Answer1 && (
                                        <div className="flex flex-row  space-x-2 items-center justify-between">
                                            <Label className="w-28">Answer 1</Label>
                                            <Input
                                                value={quizData?.Answer1}
                                                onChange={(e) => setQuizData({ ...quizData, Answer1: e.target.value })}
                                            />
                                            <div className="flex justify-between flex-1 space-x-2 items-center">
                                                <Button
                                                    onClick={() => setQuizData({ ...quizData, Answer1: "" })}
                                                    type="button"
                                                    variant="destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <Checkbox
                                                    onCheckedChange={() => {
                                                        setSelectedAnswer("1");
                                                        setQuizData({ ...quizData, RightAnswer: "1" });
                                                    }}
                                                    checked={selectedAnswer === "1"}
                                                    className="w-7 h-7"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {answers?.Answer2 && (
                                        <div className="flex flex-row  space-x-2 items-center justify-between">
                                            <Label className="w-28">Answer 2</Label>
                                            <Input
                                                value={quizData?.Answer2}
                                                onChange={(e) => setQuizData({ ...quizData, Answer2: e.target.value })}
                                            />
                                            <div className="flex justify-between flex-1 space-x-2 items-center">
                                                <Button
                                                    onClick={() => setQuizData({ ...quizData, Answer2: "" })}
                                                    type="button"
                                                    variant="destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <Checkbox
                                                    onCheckedChange={() => {
                                                        setSelectedAnswer("2");
                                                        setQuizData({ ...quizData, RightAnswer: "2" });
                                                    }}
                                                    checked={selectedAnswer === "2"}
                                                    className="w-7 h-7"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {answers?.Answer3 && (
                                        <div className="flex flex-row  space-x-2 items-center justify-between">
                                            <Label className="w-28">Answer 3</Label>
                                            <Input
                                                value={quizData?.Answer3}
                                                onChange={(e) => setQuizData({ ...quizData, Answer3: e.target.value })}
                                            />
                                            <div className="flex justify-between flex-1 space-x-2 items-center">
                                                <Button
                                                    onClick={() => setQuizData({ ...quizData, Answer3: "" })}
                                                    type="button"
                                                    variant="destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <Checkbox
                                                    onCheckedChange={() => {
                                                        setSelectedAnswer("3");
                                                        setQuizData({ ...quizData, RightAnswer: "3" });
                                                    }}
                                                    checked={selectedAnswer === "3"}
                                                    className="w-7 h-7"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {answers?.Answer4 && (
                                        <div className="flex flex-row  space-x-2 items-center justify-between">
                                            <Label className="w-28">Answer 4</Label>
                                            <Input
                                                value={quizData?.Answer4}
                                                onChange={(e) => setQuizData({ ...quizData, Answer4: e.target.value })}
                                            />
                                            <div className="flex justify-between flex-1 space-x-2 items-center">
                                                <Button
                                                    onClick={() => setQuizData({ ...quizData, Answer4: "" })}
                                                    type="button"
                                                    variant="destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <Checkbox
                                                    onCheckedChange={() => {
                                                        setSelectedAnswer("4");
                                                        setQuizData({ ...quizData, RightAnswer: "4" });
                                                    }}
                                                    checked={selectedAnswer === "4"}
                                                    className="w-7 h-7"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Button type="button">Add Option</Button>
                            </div>
                            <Button type="submit">Update</Button>
                        </form>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default EditQuestionMaster;
