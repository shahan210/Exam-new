/* eslint-disable no-prototype-builtins */
import { ChevronLeft, ImagePlus, X } from "lucide-react";
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
import uploadQuestionImages from "../../../API/examMaster/uploadQuestionImages";

const AddNewQuestionMaster = () => {
    const location = useLocation();
    const id = location.state.id;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [classList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [HTimg, setHTimg] = useState(null);
    const [HTimgPreview, setHTimgPreview] = useState(null);
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

    const [questions, setQuestions] = useState([{ name: "Answer1", value: "", img: "", imgPreview: "", isChecked: false }]);

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
    }, []);

    useEffect(() => {
        fetchExamIdData();
        fetchQuestionMaster();
        setTimeout(() => {
            if (!id) {
                navigate(-1);
            }
        }, 3000);
    }, [id, fetchExamIdData, fetchQuestionMaster, navigate]);

    useEffect(() => {
        if (examData.ClassId) {
            setClassList(classList.filter((item) => item.id == examData.ClassId));
        }

        if (examData.SubjectID) {
            setSubjectList(subjectList.filter((item) => item.id == examData.SubjectID));
        }
    }, [examData]);

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

    const handleInputChange = (e, index) => {
        const values = [...questions];
        values[index].value = e.target.value;
        setQuestions(values);
    };

    const handleFileChange = (event, index) => {
        const values = [...questions];
        values[index].img = event.target.files[0];
        const file = event.target.files[0];
        setQuestions(values);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedValues = [...values];
                updatedValues[index].imgPreview = reader.result;
                setQuestions(updatedValues);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHTFileChange = (event) => {
        setHTimg(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHTimgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveOption = (index) => {
        const values = [...questions];
        values[index].value = "";
        setQuestions(values);
    };

    const handleRemoveImage = (index) => {
        const values = [...questions];
        values[index].img = "";
        values[index].imgPreview = "";
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

        // console.log(result, "result");
        // console.log(questions, "data");
        if (result.RightAnswer === "") return toast.warn("Choose a right answer");

        try {
            const response = await createdQuestionMaster(result);
            // console.log(response, "response");
            const questionId = response[0]?.[0]?.insertId;
            if (questions.length > 0) {
                questions?.forEach(async (data) => {
                    const formData = new FormData();
                    if (data?.img) {
                        formData.append("id", questionId);
                        formData.append("fileName", data.name);
                        formData.append("images", data.img);
                        const addImages = await uploadQuestionImages(formData);
                        console.log(addImages, "response");
                    }
                });
            }

            if (HTimg) {
                const formData = new FormData();
                formData.append("id", questionId);
                formData.append("fileName", "QuizTittle");
                formData.append("images", HTimg);
                const addImages = await uploadQuestionImages(formData);
                console.log(addImages, "response");
            }

            if (response) {
                toast.success("successfully created");
                navigate("/exam_master/edit-exam-info", {
                    state: {
                        id: id,
                    },
                });
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
                                <Select value={classList?.[0]?.name}>
                                    <SelectTrigger id="selectClass" className="w-full">
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
                                <Select value={subjectList?.[0]?.name}>
                                    <SelectTrigger id="selectSubject" className="w-full">
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
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="Question1" className="text-md font-semibold w-48">
                                    Question Title
                                </Label>

                                <Input
                                    type="text"
                                    name="Question1"
                                    value={result?.Question1}
                                    onChange={(e) => setResult({ ...result, Question1: e.target.value })}
                                    className="border p-2 w-full"
                                />
                                <Label htmlFor={`file-input`} className="w-fit h-full">
                                    <div className="bg-blue-500 text-white p-3 rounded inline-flex items-center justify-center cursor-pointer">
                                        <ImagePlus className="h-4 w-4" />
                                    </div>
                                </Label>
                                <Input
                                    id={`file-input`}
                                    type="file"
                                    onChange={(e) => handleHTFileChange(e)}
                                    name="images"
                                    className="hidden"
                                    accept="image/*"
                                ></Input>
                            </div>
                            {HTimg && (
                                <div className="flex justify-start">
                                    <div className="flex relative">
                                        <button
                                            onClick={() => {
                                                setHTimg("");
                                                setHTimgPreview("");
                                            }}
                                            className="top-0 right-0 absolute bg-red-500 -mt-5 w-fit h-fit"
                                        >
                                            <X />
                                        </button>
                                        <img src={HTimgPreview} className="size-20" />
                                    </div>
                                </div>
                            )}
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
                                            {option.img && (
                                                <div className="flex justify-start max-w-44 w-fit min-w-32">
                                                    <div className="flex relative mx-auto">
                                                        <button
                                                            onClick={() => {
                                                                handleRemoveImage(optionIndex);
                                                            }}
                                                            className="top-0 right-0 absolute bg-red-500 -mt-5 w-fit h-fit"
                                                        >
                                                            <X />
                                                        </button>
                                                        <img
                                                            src={option.imgPreview}
                                                            alt="lgogogogogog"
                                                            className="size-20"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="w-full flex space-x-2">
                                                <div className="justify-between flex-1 space-x-2 items-center flex">
                                                    <Input
                                                        id={`option-${optionIndex}`}
                                                        name={option.name}
                                                        className={"bg-green-200"}
                                                        value={option.value}
                                                        onChange={(e) => handleInputChange(e, optionIndex)}
                                                    />
                                                    <Label htmlFor={`file-input-${optionIndex}`} className="w-fit h-full">
                                                        <div className="bg-blue-500 text-white p-3 rounded inline-flex items-center justify-center cursor-pointer">
                                                            <ImagePlus className="h-4 w-4" />
                                                        </div>
                                                    </Label>
                                                    <Input
                                                        id={`file-input-${optionIndex}`}
                                                        type="file"
                                                        name="images"
                                                        onChange={(e) => handleFileChange(e, optionIndex)}
                                                        className="hidden"
                                                        accept="image/*"
                                                    ></Input>
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
