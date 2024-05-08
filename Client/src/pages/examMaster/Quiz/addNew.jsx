/* eslint-disable no-prototype-builtins */
import { ChevronLeft, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Layout from "../../../global/components/Layout";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { getSubjectTable } from "../../../API/subjectMaster/getSubjectTable";
import getClassTable from "../../../API/classMaster/getClassTable";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "../../../components/ui/checkbox";
import getExamMasterInfo from "../../../API/examMaster/getExamMasterInfo";
import { formatDateForInput } from "../../../utils/helpers";
import getQuestionMaster from "../../../API/examMaster/getQuestionMaster";
import createdQuestionMaster from "../../../API/examMaster/createdQuestionMaster";

const AddNewQuestionMaster = () => {
    const location = useLocation();
    const id = location.state.id;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [result, setResult] = useState({
        QuestionBankID: "",
        QuestionTestID: id,
        QuestionGroupID: "",
        QuestionGroupSLNO: "",
        QuestionGroupType: "",
        ClassId: "",
        SubjectID: "",
        ClassSubjectMasterId: "",
        ChapterID: "",
        QuestionTypeID: "",
        QuestionDesc01: "",
        QuestionDesc02: "",
        Practical: "",
        Remarks: "",
        Qalerts: "",
        Question1: "",
        Answer: "",
        Answer1: "",
        Answer2: "",
        Answer3: "",
        Answer4: "",
        Answer5: "",
        Answer6: "",
        Answer7: "",
        Answer8: "",
        Answer9: "",
        Answer10: "",
        RightAnswer: "",
        IsActive: "",
        AddedDate: "",
        AddedBy: "",
        ModifiedDate: "",
        ModifiedBy: "",
        FileDocument: "",
        Audio: "",
        Video: "",
        Image: "",
    });

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

    const [input, setInput] = useState({
        year: "2023",
        className: {
            name: "",
            id: "",
        },
        subject: {
            name: "",
            id: "",
        },
        term: "",
    });

    const [questions, setQuestions] = useState([{ name: "Answer1", value: "", isChecked: false }]);

    const fetchExamIdData = useCallback(async () => {
        try {
            const response = await getExamMasterInfo(id);
            if (response[0]?.length > 0) {
                const data = response[0]?.[0]?.[0];
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

                setResult({
                    ...result,
                    ClassId: data?.ClassId || "",
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

    const fetchQuestionMaster = useCallback(async () => {
        try {
            const response = await getQuestionMaster(id);

            if (response.length > 0) {
                const data = response[0];
                setResult({
                    ...result,
                    QuestionBankID: data.QuestionBankID,
                    QuestionTestID: data.QuestionTestID,
                    QuestionGroupID: 1,
                    QuestionGroupSLNO: 1,
                    QuestionGroupType: data.QuestionGroupType,
                    ClassId: data.ClassId,
                    SubjectID: data.SubjectID,
                    ClassSubjectMasterId: data.ClassSubjectMasterId,
                    ChapterID: data.ChapterID,
                    QuestionTypeID: data.QuestionTypeID,
                    QuestionDesc01: data.QuestionDesc01,
                    QuestionDesc02: data.QuestionDesc02,
                    Practical: data.Practical,
                    Remarks: data.Remarks,
                    Qalerts: data.Qalerts,
                    Question1: data.Question1,
                    Answer: data.Answer,
                    Answer1: data.Answer1,
                    Answer2: data.Answer2,
                    Answer3: data.Answer3,
                    Answer4: data.Answer4,
                    Answer5: data.Answer5,
                    Answer6: data.Answer6,
                    Answer7: data.Answer7,
                    Answer8: data.Answer8,
                    Answer9: data.Answer9,
                    Answer10: data.Answer10,
                    RightAnswer: data.RightAnswer,
                    IsActive: data.IsActive,
                    AddedDate: formatDateForInput(data.AddedDate),
                    AddedBy: data.AddedBy,
                    ModifiedDate: data.ModifiedDate,
                    ModifiedBy: data.ModifiedBy,
                    FileDocument: data.FileDocument,
                    Audio: data.Audio,
                    Video: data.Video,
                    Image: data.Image,
                });
            }
        } catch (error) {
            console.error("Error fetching exam data:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchExamIdData();
        fetchQuestionMaster();
        setTimeout(() => {
            if (!id) {
                navigate(-1);
            }
        }, 3000);
    }, [id, fetchExamIdData, fetchQuestionMaster]);

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
        if (examData.ClassId && examData.SubjectID) {
            const filterClass = classList.filter((item) => item.id == examData.ClassId);
            const filterSub = subjectList.filter((item) => item.id == examData.SubjectID);
            if (filterClass) {
                setClassList(filterClass);
            }
            if (filterSub) {
                setSubjectList(filterSub);
            }
        }
    }, [examData]);

    useEffect(() => {
        fetchSubjects();
        fetchClassess();
    }, []);

    const addOptionHandler = () => {
        let nextName = `Answer${questions.length + 1}`;
        if (questions.length < 4) {
            while (questions.some((question) => question.name === nextName)) {
                nextName = `Answer${parseInt(nextName.replace("Answer", "")) - 1}`;
            }
            setQuestions([...questions, { name: nextName, value: "", isChecked: false }]);
        } else {
            toast.warn("Maximum options allowed is 4");
        }
    };

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
            setResult({
                ...result,
                ClassId: filterData[0]?.id,
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
            setResult({
                ...result,
                SubjectID: filterData[0]?.id,
            });
        }
    };

    const handleInputChange = (e, index) => {
        const values = [...questions];
        values[index].value = e.target.value;
        setQuestions(values);
    };

    const handleRemoveOption = (index) => {
        const values = [...questions];
        values[index].value = "";
        setQuestions(values);
    };

    const handleCheckboxChange = (index) => {
        const values = [...questions];
        values.forEach((field, idx) => {
            field.isChecked = idx === index;
        });
        setQuestions(values);
        setResult({ ...result, RightAnswer: index + 1 });
    };

    useEffect(() => {
        console.log("use");
        // questions?.forEach((quesData) => {
        //     console.log(quesData,'ques call');
        //     console.log(quesData.name,'ques name');
        //     console.log(quesData.value,'ques value');
        //     setResult({
        //         ...result,
        //         [quesData.name]: quesData.value,
        //     });
        // });
        setResult((prevResult) => {
            const updatedResult = { ...prevResult }; // Preserve existing result values
            questions?.forEach((quesData) => {
                if (updatedResult.hasOwnProperty(quesData.name)) {
                    // If the name already exists in result, update its value
                    updatedResult[quesData.name] = quesData.value;
                } else {
                    // If the name doesn't exist in result, add it
                    updatedResult[quesData.name] = quesData.value;
                }
            });
            return updatedResult;
        });
    }, [questions]);

    const handleSubmission = async (e) => {
        e.preventDefault();

        console.log(result, "result");
        console.log(questions, "data");
        if (result.RightAnswer === "") return toast.warn("Choose a right answer");

        try {
            const response = await createdQuestionMaster(result);
            console.log(response);
            if (response) {
                toast.success("success");
            }
        } catch (error) {
            console.log(error);
            toast.error("error occured");
        }
    };

    return (
        <Layout>
            <div className="">
                <Button onClick={() => navigate(-1)}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h3 className="font-semibold md:text-xl">Add New</h3>

                <div className=" p-6 rounded-md w-full md:w-3/4 lg:w-full ">
                    {/* {questionNewData && ( */}
                    <form className="flex flex-col space-y-4">
                        {/* <form onSubmit={handleSubmit} className="flex flex-col space-y-4"> */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                <Label htmlFor="examDate" className="text-md font-semibold w-28">
                                    Exam Date
                                </Label>
                                <Input
                                    type="date"
                                    name="ExamDate"
                                    value={examData?.ExamDate}
                                    onChange={(e) => setExamData({ ...examData, ExamDate: e.target.value })}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="flex items-center">
                                <Label htmlFor="year" className="text-md font-semibold w-28">
                                    Year
                                </Label>
                                <Input
                                    type="text"
                                    name="Year"
                                    value={examData?.AcaYear}
                                    onChange={(e) => setExamData({ ...examData, AcaYear: e.target.value })}
                                    className="border p-2 w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                <Label htmlFor="selectClass" className="text-md font-semibold w-28">
                                    Class
                                </Label>
                                <Select defaultValue={input.className.name} onValueChange={(v) => handleSelect(v, "class")}>
                                    <SelectTrigger id="class" className="w-full">
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
                            <div className="flex items-center">
                                <Label htmlFor="selectSubject" className="text-md font-semibold w-28">
                                    Subject
                                </Label>
                                <Select defaultValue={input.subject.name} onValueChange={(v) => handleSelect(v, "sub")}>
                                    <SelectTrigger id="class" className="w-full">
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
                        </div>

                        {/* <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                <Label htmlFor="questionType" className="text-md font-semibold w-48">
                                    Question Type
                                </Label>
                                <Input
                                    type="text"
                                    name="QuestionType"
                                    value={result?.Question1}
                                    onChange={(e) => setResult({ ...result, Question1: e.target.value })}
                                />
                            </div>
                        </div> */}

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                <Label htmlFor="questionDesc01" className="text-md font-semibold w-48">
                                    QuestionDesc01
                                </Label>
                                <Input
                                    type="text"
                                    name="QuestionDesc01"
                                    value={result?.QuestionDesc01}
                                    onChange={(e) => setResult({ ...result, QuestionDesc01: e.target.value })}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="flex items-center">
                                <Label htmlFor="questionDesc02" className="text-md font-semibold w-48">
                                    QuestionDesc02
                                </Label>
                                <Input
                                    type="text"
                                    name="QuestionDesc02"
                                    value={result?.QuestionDesc02}
                                    onChange={(e) => setResult({ ...result, QuestionDesc02: e.target.value })}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="flex items-center">
                                <Label htmlFor="questionDesc02" className="text-md font-semibold w-48">
                                    Question Title
                                </Label>
                                <Input
                                    type="text"
                                    name="QuestionDesc02"
                                    value={result?.Question1}
                                    onChange={(e) => setResult({ ...result, Question1: e.target.value })}
                                    className="border p-2 w-full"
                                />
                            </div>
                        </div>

                        {/* question title and its title image upload button  */}

                        <div className="border p-4 py-4 space-y-4 rounded-md">
                            {questions.map((option, optionIndex) => {
                                return (
                                    <div className="flex flex-col gap-2" key={optionIndex}>
                                        <div className="flex flex-col lg:flex-row  lg:space-x-2 items-center justify-between">
                                            <Label className="w-28" htmlFor={`option-${optionIndex}`}>{`Option ${
                                                optionIndex + 1
                                            }`}</Label>
                                            <Input
                                                id={`option-${optionIndex}`}
                                                name={option.name}
                                                className={"bg-green-200"}
                                                value={option.value}
                                                onChange={(e) => handleInputChange(e, optionIndex)}
                                            />
                                            <div className="flex justify-between flex-1 space-x-2 items-center">
                                                {/* <Label
                                                    htmlFor={`file-input-${optionIndex}`}
                                                    // className="w-4 h-4 bg-red-400"
                                                >
                                                    <div className="bg-primary text-white p-2 rounded h-10 w-10 inline-flex items-center justify-center cursor-pointer">
                                                        <ImagePlus className="h-4 w-4" />
                                                    </div>
                                                </Label> */}

                                                {/* <Input
                                                    // value={questions.options[
                                                    //     optionIndex
                                                    // ].image?.toString()}
                                                    id={`file-input-${optionIndex}`}
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    // onChange={(e) => handleOptionImageAdd(optionIndex, e)}
                                                ></Input> */}
                                                <Button
                                                    type="button"
                                                    onClick={() => handleRemoveOption(optionIndex)}
                                                    variant="destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <Checkbox
                                                    className="w-7 h-7"
                                                    checked={option.isChecked}
                                                    onCheckedChange={() => handleCheckboxChange(optionIndex)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* <Button type="button"> */}
                            <Button type="button" onClick={addOptionHandler}>
                                Add Option
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 mt-4 mx-auto"
                            onClick={handleSubmission}
                        >
                            Submit
                        </Button>
                    </form>
                    {/* )} */}
                </div>
            </div>
        </Layout>
    );
};

export default AddNewQuestionMaster;
