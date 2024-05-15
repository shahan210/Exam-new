/* eslint-disable no-unused-vars */
import Layout from "../../../global/components/Layout";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import React, { useCallback, useEffect, useState } from "react";
import { getSubjectTable } from "../../../API/subjectMaster/getSubjectTable";
import getClassTable from "../../../API/classMaster/getClassTable";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { ChevronLeft, ImagePlus, Images, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import getExamMasterInfo from "../../../API/examMaster/getExamMasterInfo";
import { formatDateForInput } from "../../../utils/helpers";
import getQuizMasterEditInfo from "../../../API/examMaster/editQuestionMaster";
import updateQuesMaster from "../../../API/examMaster/updateQuesMaster";
import updateExamMaster from "../../../API/examMaster/updateExamMaster";
import uploadQuestionImages from "../../../API/examMaster/uploadQuestionImages";
import { useGlobalContext } from "../../../global/GlobalContext";

const EditQuestionMaster = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const examid = location.state.examId;
    const { loading, setLoading } = useGlobalContext();
    const quizid = location.state.quizId;
    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [image, setImage] = useState([]);
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
            setLoading(true);
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
                setLoading(false);
            }
            setLoading(false);
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
            setLoading(true);
            const response = await getQuizMasterEditInfo(quizid);
            const quizInfo = response[0].JSONData1[0]?.[0]?.[0];
            const quizImages = response[0].JSONData2[0];
            console.log(quizImages[0], "1111111111111");
            console.log(quizInfo, "222222222222");
            let combineData = [];

            if (quizInfo.Answer1) {
                const combine = {
                    Answer: quizInfo.Answer1,
                    AnswerTitle: "Answer1",
                    AnswerImage: quizImages[0]?.Answer1,
                    updated: false,
                    newImage: "",
                    newImgPreview: "",
                    QuestionBankID: quizImages[0]?.QuestionBankID,
                    imageId: quizImages?.[0]?.imageId,
                };
                combineData.push(combine);
            }
            if (quizInfo.Answer2) {
                const combine = {
                    Answer: quizInfo.Answer2,
                    AnswerTitle: "Answer2",
                    AnswerImage: quizImages[0]?.Answer2,
                    updated: false,
                    newImage: "",
                    newImgPreview: "",
                    QuestionBankID: quizImages[0]?.QuestionBankID,
                    imageId: quizImages?.[0]?.imageId,
                };
                combineData.push(combine);
            }
            if (quizInfo.Answer3) {
                const combine = {
                    Answer: quizInfo.Answer3,
                    AnswerTitle: "Answer3",
                    AnswerImage: quizImages[0]?.Answer3,
                    updated: false,
                    newImage: "",
                    newImgPreview: "",
                    QuestionBankID: quizImages[0]?.QuestionBankID,
                    imageId: quizImages?.[0]?.imageId,
                };
                combineData.push(combine);
            }
            if (quizInfo.Answer4) {
                const combine = {
                    Answer: quizInfo.Answer4,
                    AnswerTitle: "Answer4",
                    AnswerImage: quizImages[0]?.Answer4,
                    updated: false,
                    newImage: "",
                    newImgPreview: "",
                    QuestionBankID: quizImages[0]?.QuestionBankID,
                    imageId: quizImages?.[0]?.imageId,
                };
                combineData.push(combine);
            }
            if (quizInfo.Question1) {
                const combine = {
                    Answer: quizInfo.Question1,
                    AnswerTitle: "QuizTittle",
                    AnswerImage: quizImages[0]?.QuizTittle,
                    updated: false,
                    newImage: "",
                    newImgPreview: "",
                    QuestionBankID: quizImages[0]?.QuestionBankID,
                    imageId: quizImages?.[0]?.imageId,
                };
                combineData.push(combine);
            }

            setImage(combineData);

            const answerObjects = Object.entries(quizInfo)
                .filter(([key, _]) => key.startsWith("Answer"))
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

            setQuizData(quizInfo);
            setSelectedAnswer(quizInfo.RightAnswer);
            setAnswers(answerObjects);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching exam data:", error);
        }
    }, [quizid]);

    const fetchClassess = async () => {
        try {
            const result = await getClassTable("all");
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
            const result = await getSubjectTable("all");
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

    const handleFileChange = (event, name) => {
        const file = event.target.files[0];
        const updatedArray = image.map((item) => {
            if (item.AnswerTitle === name) {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const newImgPreview = event.target.result;
                        setImage((prevState) => {
                            return prevState.map((prevItem) => {
                                if (prevItem.AnswerTitle === name) {
                                    return {
                                        ...prevItem,
                                        AnswerImage: "",
                                        newImage: file,
                                        updated: true,
                                        newImgPreview: newImgPreview,
                                    };
                                }
                                return prevItem;
                            });
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }
            return item;
        });
    };

    useEffect(() => {
        if (quizData.ClassId) {
            setClassList(classList.filter((item) => item.id === quizData.ClassId));
        }
        if (quizData.SubjectID) {
            setSubjectList(subjectList.filter((item) => item.id === quizData.SubjectID));
        }
    }, [quizData]);
    // console.log(image, "qixx");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const [updateQues, updateExam] = await Promise.all([updateQuesMaster(quizData), updateExamMaster(examData)]);
            if (updateExam.length > 0 && updateQues.length > 0) {
                image.map(async (data) => {
                    if (data.updated) {
                        const formData = new FormData();
                        formData.append("id", data?.QuestionBankID);
                        formData.append("fileName", data?.AnswerTitle);
                        formData.append("images", data?.newImage);
                        const addImages = await uploadQuestionImages(formData);
                    }
                });
                setLoading(false);
                navigate(-1);
                toast.success("success");
            }
            setLoading(false);
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
                                <Select value={classList?.[0]?.name} className="md:basis-3/4 w-full">
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
                                <Select value={subjectList?.[0]?.name} className="md:basis-3/4 w-full">
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
                                <div className="flex w-full flex-col basis-1/4">
                                    <Label htmlFor="question-title" className="text-md w-full font-semibold">
                                        Question Title
                                    </Label>
                                    {image.length > 0 &&
                                        image.map((data) => {
                                            const imageUrl = `http://localhost:4040/${data.AnswerImage}`;
                                            return (
                                                <React.Fragment key={data.AnswerTitle}>
                                                    {data.AnswerTitle === "QuizTittle" &&
                                                        (data?.AnswerImage || data?.newImgPreview) && (
                                                            <div className="flex w-fit flex-row-reverse">
                                                                <div className="relative">
                                                                    <button type="button" className="absolute left-0">
                                                                        <X />
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <img
                                                                        src={
                                                                            data.AnswerImage ? imageUrl : data.newImgPreview
                                                                        }
                                                                        className="size-20"
                                                                        alt="aaaaaaaaaaaaaaaa"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                </React.Fragment>
                                            );
                                        })}
                                </div>
                                <Input
                                    type="text"
                                    value={quizData?.Question1}
                                    onChange={(e) => setQuizData({ ...quizData, Question1: e.target.value })}
                                    id="question-title"
                                    className="md:basis-3/4 w-full"
                                    name="Question1"
                                />
                                <Label htmlFor={`file-input`} className="w-fit h-full">
                                    <div className="bg-blue-500 text-white p-3 rounded inline-flex items-center justify-center cursor-pointer">
                                        <ImagePlus className="h-4 w-4" />
                                    </div>
                                </Label>
                                <Input
                                    id={`file-input`}
                                    type="file"
                                    onChange={(e) => handleFileChange(e, "QuizTittle")}
                                    name="images"
                                    className="hidden"
                                    accept="image/*"
                                ></Input>
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
                                            <div className="md:basis-1/4">
                                                <Label className="w-28">Answer 1</Label>
                                                {image.length > 0 &&
                                                    image.map((data) => {
                                                        const imageUrl = `http://localhost:4040/${data.AnswerImage}`;
                                                        return (
                                                            <React.Fragment key={data.AnswerTitle}>
                                                                {data.AnswerTitle === "Answer1" &&
                                                                    (data?.AnswerImage || data?.newImgPreview) && (
                                                                        <div className="flex w-fit flex-row-reverse">
                                                                            <div className="relative">
                                                                                <button
                                                                                    type="button"
                                                                                    className="absolute left-0"
                                                                                >
                                                                                    <X />
                                                                                </button>
                                                                            </div>
                                                                            <div>
                                                                                <img
                                                                                    src={
                                                                                        data.AnswerImage
                                                                                            ? imageUrl
                                                                                            : data?.newImgPreview
                                                                                    }
                                                                                    className="size-20"
                                                                                    alt="aaaaaaaaaaaaaaaa"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </div>
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
                                                <Label htmlFor={`Answer1`} className="w-fit h-full">
                                                    <div className="bg-blue-500 text-white p-3 rounded inline-flex items-center justify-center cursor-pointer">
                                                        <ImagePlus className="h-4 w-4" />
                                                    </div>
                                                </Label>
                                                <Input
                                                    id={`Answer1`}
                                                    type="file"
                                                    onChange={(e) => handleFileChange(e, "Answer1")}
                                                    name="images"
                                                    className="hidden"
                                                    accept="image/*"
                                                ></Input>
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
                                            <div className="md:basis-1/4">
                                                <Label className="w-28">Answer 2</Label>
                                                {image.length > 0 &&
                                                    image.map((data) => {
                                                        const imageUrl = `http://localhost:4040/${data.AnswerImage}`;
                                                        return (
                                                            <React.Fragment key={data.AnswerTitle}>
                                                                {data.AnswerTitle === "Answer2" &&
                                                                    (data?.AnswerImage || data?.newImgPreview) && (
                                                                        <div className="flex w-fit flex-row-reverse">
                                                                            <div className="relative">
                                                                                <button
                                                                                    type="button"
                                                                                    className="absolute left-0"
                                                                                >
                                                                                    <X />
                                                                                </button>
                                                                            </div>
                                                                            <div>
                                                                                <img
                                                                                    src={
                                                                                        data.AnswerImage
                                                                                            ? imageUrl
                                                                                            : data?.newImgPreview
                                                                                    }
                                                                                    className="size-20"
                                                                                    alt="aaaaaaaaaaaaaaaa"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </div>
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
                                                <Label htmlFor={`Answer2`} className="w-fit h-full">
                                                    <div className="bg-blue-500 text-white p-3 rounded inline-flex items-center justify-center cursor-pointer">
                                                        <ImagePlus className="h-4 w-4" />
                                                    </div>
                                                </Label>
                                                <Input
                                                    id={`Answer2`}
                                                    type="file"
                                                    onChange={(e) => handleFileChange(e, "Answer2")}
                                                    name="images"
                                                    className="hidden"
                                                    accept="image/*"
                                                ></Input>
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
                                            <div className="md:basis-1/4">
                                                <Label className="w-28">Answer 3</Label>
                                                {image.length > 0 &&
                                                    image.map((data) => {
                                                        const imageUrl = `http://localhost:4040/${data.AnswerImage}`;
                                                        return (
                                                            <React.Fragment key={data.AnswerTitle}>
                                                                {data.AnswerTitle === "Answer3" &&
                                                                    (data?.AnswerImage || data?.newImgPreview) && (
                                                                        <div className="flex w-fit my-2 flex-row-reverse">
                                                                            <div className="relative">
                                                                                <button
                                                                                    type="button"
                                                                                    className="absolute left-0"
                                                                                >
                                                                                    <X />
                                                                                </button>
                                                                            </div>
                                                                            <div>
                                                                                <img
                                                                                    src={
                                                                                        data.AnswerImage
                                                                                            ? imageUrl
                                                                                            : data?.newImgPreview
                                                                                    }
                                                                                    className="size-20"
                                                                                    alt="aaaaaaaaaaaaaaaa"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </div>
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
                                                <Label htmlFor={`Answer3`} className="w-fit h-full">
                                                    <div className="bg-blue-500 text-white p-3 rounded inline-flex items-center justify-center cursor-pointer">
                                                        <ImagePlus className="h-4 w-4" />
                                                    </div>
                                                </Label>
                                                <Input
                                                    id={`Answer3`}
                                                    type="file"
                                                    onChange={(e) => handleFileChange(e, "Answer3")}
                                                    name="images"
                                                    className="hidden"
                                                    accept="image/*"
                                                ></Input>
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
                                            <div className="md:basis-1/4">
                                                <Label className="w-28">Answer 4</Label>
                                                {image.length > 0 &&
                                                    image.map((data) => {
                                                        const imageUrl = `http://localhost:4040/${data.AnswerImage}`;
                                                        return (
                                                            <React.Fragment key={data.AnswerTitle}>
                                                                {data.AnswerTitle === "Answer4" &&
                                                                    (data?.AnswerImage || data?.newImgPreview) && (
                                                                        <div className="flex w-fit flex-row-reverse">
                                                                            <div className="relative">
                                                                                <button
                                                                                    type="button"
                                                                                    className="absolute left-0"
                                                                                >
                                                                                    <X />
                                                                                </button>
                                                                            </div>
                                                                            <div>
                                                                                <img
                                                                                    src={
                                                                                        data.AnswerImage
                                                                                            ? imageUrl
                                                                                            : data?.newImgPreview
                                                                                    }
                                                                                    className="size-20"
                                                                                    alt="aaaaaaaaaaaaaaaa"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </div>
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
                                                <Label htmlFor={`Answer4`} className="w-fit h-full">
                                                    <div className="bg-blue-500 text-white p-3 rounded inline-flex items-center justify-center cursor-pointer">
                                                        <ImagePlus className="h-4 w-4" />
                                                    </div>
                                                </Label>
                                                <Input
                                                    id={`Answer4`}
                                                    type="file"
                                                    onChange={(e) => handleFileChange(e, "Answer4")}
                                                    name="images"
                                                    className="hidden"
                                                    accept="image/*"
                                                ></Input>
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
