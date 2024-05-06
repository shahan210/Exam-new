import { Copy, Delete, Edit2, Plus, PlusCircle, Printer, RefreshCcw, View } from "lucide-react";
import { useState, useEffect } from "react";
import { convertDotNetDate } from "../../utils/helpers";
import ClassSelect from "./components/ClassSelect";
import SubjectSelect from "./components/SubjectSelect";
import InsertExamNew from "./components/InsertExamNew";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Label } from "../../components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import Layout from "../../global/components/Layout";

export default function Exams() {
    const [input, setInput] = useState({
        year: "2023",
        class: "",
        subject: "",
        term: "",
    });

    const [selectedQuestionTestID, setSelectedQuestionTestID] = useState(null);
    const [selected, setSelected] = useState(false);

    // const [showModal, setShowModal] = useState(false);
    // const [form, setForm] = useState();

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!(input.class === "" || input.subject === "" || input.year === "")) {
    //         const form = new FormData();
    //         form.append("description", "Request For Stock Item Display List");
    //         form.append("ReqYear", input.year);
    //         form.append("ReqClassID", input.class);
    //         form.append("ReqSubjID", input.subject);
    //         form.append("ReqExamNme", "");
    //         form.append("title", "GetExamDefinitionList");
    //         performRequest(form);
    //     }
    // };

    useEffect(() => {
        const examForm = new FormData();
        examForm.append("title", "GetExamQuestionsList");
        examForm.append("description", "Request Question By Code");
        examForm.append("ReqQuestionTestID", "38");
        // handleRequest(examForm);

        // console.log("EXAM DATA", examData);
    }, []);

    const handleEdit = () => {
        // setShowModal(true);
    };

    // const handleRadioChange = (e) => {
    //     setSelectedQuestionTestID(Number(e.target.value));
    //     setSelected(true);
    // };

    return (
        <>
            <Layout>
                <form className="flex  flex-col">
                    {/* <form onSubmit={handleFormSubmit} className="flex  flex-col"> */}
                    <div className="flex flex-col space-y-2 md:w-2/6">
                        <div className="md:flex md:items-center md:space-x-2 justify-between flex-col md:flex-row">
                            <Label htmlFor="year" className="md:text-sm text-md">
                                Year
                            </Label>
                            <Input
                                value={input.year}
                                className="md:w-64"
                                id="year"
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        year: e.target.value,
                                    })
                                }
                            ></Input>
                        </div>
                        <div className="md:flex md:items-center md:space-x-2 justify-between flex-col md:flex-row">
                            <Label htmlFor="term" className="md:text-sm text-md">
                                Term
                            </Label>
                            <Input
                                value={input.term}
                                className="md:w-64"
                                id="term"
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        term: e.target.value,
                                    })
                                }
                            ></Input>
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="class" className="md:text-sm text-md">
                                Class
                            </Label>
                            <ClassSelect handleChange={(v) => setInput({ ...input, class: v })} selected={input.class} />
                        </div>
                        <div className="flex items-center space-x-2 justify-between">
                            <Label htmlFor="subject" className="md:text-sm text-md">
                                Subject
                            </Label>
                            <SubjectSelect
                                handleChange={(v) => setInput({ ...input, subject: v })}
                                selected={input.subject}
                            />
                        </div>
                        <Button>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                </form>

                <div className="w-full mt-2 px-5 py-4 flex flex-col md:flex-row border rounded-sm space-y-2 md:space-y-0 md:space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add New
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Exam</DialogTitle>
                                <DialogDescription>Enter the form with necessary details</DialogDescription>
                            </DialogHeader>
                            <InsertExamNew />
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleEdit}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                    </Button>

                    <Button>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                    <Button className="flex items-center" disabled={!selected}>
                        <View className="mr-2 h-4 w-4" />
                        View/Change
                    </Button>
                    <Button disabled={selectedQuestionTestID === null}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Questions
                    </Button>
                    <Button>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Result
                    </Button>

                    <Button>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Questions
                    </Button>

                    <Button variant="destructive">
                        Delete
                        <Delete className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                {/* {showModal && (
                <div className="fixed inset-0 z-50 mt-24 customHeightModalNewDepartment opacity-1 flex items-center justify-center">
                    <div className="bg-white customScrolling relative bottom-3 -mt-5 customHeightModalDepartment shadow-md shadow-gray-100 p-4 rounded-lg text-center border border-gray-300">
                        <IoMdClose
                            onClick={closeModal}
                            className="bg-red-500 absolute top-0 rounded-md right-0 text-white"
                            size={36}
                        />
                    </div>
                </div>
            )} */}

                <div className="md:w-2/4 mt-2 border rounded-sm overflow-hidden">
                    <Table className="min-w-full bg-white border border-gray-300">
                        {/* {exams && exams.length < 1 && !loading && (
                        <TableCaption className="text-center py-2 text-gray-700">No exams found</TableCaption>
                    )}
                    {loading && <TableCaption className="text-center py-2 text-gray-700">Loading...</TableCaption>}
                    {error && <TableCaption className="text-center py-2 text-red-500">{error}</TableCaption>} */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-2 py-2">Select</TableHead>
                                <TableHead className="px-2 py-2">Exam Name</TableHead>
                                <TableHead className="px-2 py-2">Year</TableHead>
                                <TableHead className="px-2 py-2">Class</TableHead>
                                <TableHead className="px-2 py-2">Subject</TableHead>
                                <TableHead className="px-2 py-2">Exam Date</TableHead>
                                <TableHead className="px-2 py-2">Edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {exams &&
                            exams.map((exam) => (
                                <TableRow key={exam.ExamName} className="hover:bg-gray-100">
                                    <TableCell className="px-2 py-2 font-medium">
                                        <input
                                            type="radio"
                                            value={exam.QuestionTestID}
                                            onChange={handleRadioChange}
                                            checked={selectedQuestionTestID === exam.QuestionTestID}
                                        />
                                    </TableCell>
                                    <TableCell className="px-2 py-2">{exam.ExamName}</TableCell>
                                    <TableCell className="px-2 py-2">{exam.AcaYear}</TableCell>
                                    <TableCell className="px-2 py-2">{exam.ClassName}</TableCell>
                                    <TableCell className="px-2 py-2">{exam.SubjectName}</TableCell>
                                    <TableCell className="px-2 py-2">{convertDotNetDate(exam.ExamDate) || ""}</TableCell>
                                    <TableCell className="px-2 py-2">
                                        <Button asChild>
                                            <Link href={`/dashboard/edit-exam/${exam.QuestionTestID}`}>
                                                <Edit className="h-4 w-4 text-blue-500" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </div>
            </Layout>
        </>
    );
}
