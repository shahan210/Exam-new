/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, PlusCircle, Save, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Layout from "../../../global/components/Layout";
import EditExam from "../components/editExam";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import getExamMasterEditInfo from "../../../API/examMaster/getExamMasterEditInfo";
import { formatDateForInput } from "../../../utils/helpers";
import { useGlobalContext } from "../../../global/GlobalContext";
import { toast } from "react-toastify";

const EditExamDetails = () => {
  const location = useLocation();
  const id = location.state.id;
  const navigate = useNavigate();
  const { loading, setLoading } = useGlobalContext();

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
  const [result, setResult] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const fetchExamIdData = useCallback(async () => {
    const rightsString = localStorage.getItem("rights");
    const rights = rightsString.split(",").map((str) => str.trim());
    const superAdmin = JSON.parse(localStorage.getItem("user"));
    const rightsId = 1553;
    if (superAdmin !== 6) {
      if (!rights.includes(rightsId.toString())) {
        toast.warning("Access Denied");
        navigate("/exam_master");
        return;
      }
    }
    try {
      setLoading(true);
      const response = await getExamMasterEditInfo(id);
      const jsonData1 = response[0]?.JSONData1[0]?.[0];
      const jsonData2 = response[0]?.JSONData2[0]?.[0];
      setResult(jsonData2);
      if (response[0]?.length > 0) {
        const data = jsonData1;
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
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchExamIdData();
  }, [fetchExamIdData]);

  const handleRadioChange = (index) => {
    setSelectedQuestionIndex(index);
    console.log("Question Data", index);
  };

  return (
    <Layout>
      <Button onClick={() => navigate(-1)}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Edit Exam</h1>

        <Button asChild>
          <button
            onClick={() => {
              navigate("/exam_master/add-new-ques", {
                state: {
                  id: id,
                },
              });
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </button>
        </Button>
      </div>

      <div className="border rounded w-full  mt-2 overflow-auto">
        {/* Existing table code */}

        {/* Responsive form */}
        <EditExam examId={id} />
      </div>

      <div className="border rounded w-full mt-2 overflow-auto">
        <Table>
          {loading && <TableCaption className="mb-2">Loading...</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead className="px-0 md:px-4">#</TableHead>
              <TableHead className="px-0 md:px-4">Question Type</TableHead>
              <TableHead className="px-0 md:px-4">Group SLNo</TableHead>
              <TableHead className="px-0 md:px-4">Question</TableHead>
              <TableHead className="px-0 md:px-4">Mark</TableHead>
              <TableHead className="px-0 md:px-4">Sl No</TableHead>
              <TableHead className="px-0 md:px-4">Update /Delete</TableHead>
              <TableHead className="px-0 md:px-4">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result &&
              result.map((question, index) => (
                <TableRow key={question.ExamQuestionID}>
                  <TableCell className="font-medium">
                    <input
                      type="radio"
                      name="questionRadio"
                      className="size-5"
                      checked={
                        selectedQuestionIndex === question.QuestionBankID
                      }
                      onChange={() =>
                        handleRadioChange(question.QuestionBankID)
                      }
                    />
                  </TableCell>
                  <TableCell>{question.QuestionBankID}</TableCell>
                  <TableCell>{question.QuestionGroupSLNO}</TableCell>
                  <TableCell>{question.Question1}</TableCell>
                  <TableCell>
                    <Input value={question.ExmMark}></Input>
                  </TableCell>
                  <TableCell>
                    <Input value={question.ExmSlno}></Input>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button>Update</Button>
                    <Button variant="destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      type="button"
                      className="bg-green-500 pxX-6 py-2 rounded-md text-white"
                      onClick={
                        () =>
                          navigate(`/exam_master/edit-quiz-info`, {
                            state: {
                              examId: id,
                              quizId: question.QuestionBankID,
                            },
                          })
                        // handleQuestionEdit(
                        //     question.QuestionBankID,
                        //     question.QuestionTestID
                        // )
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Modal for editing questions, trigged on edit Click */}
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={() => setIsEditDialogOpen(!isEditDialogOpen)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Question</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {loading && "Loading..."}
            {result && (
              <form className="flex flex-col space-y-2 ">
                <div className="flex flex-col space-y-2">
                  <Label className="font-semibold ">Question 1</Label>
                  <Input value={result.Question1} />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="question1" className="font-semibold ">
                    Option 1
                  </Label>
                  <Input id="question1" value={result.Answer1} />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="option1" className="font-semibold ">
                    Option 2
                  </Label>

                  <Input id="option1" value={result.Answer2} />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="option2" className="font-semibold ">
                    Option 3
                  </Label>
                  <Input id="option2" value={result.Answer3} />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="option2" className="font-semibold ">
                    Option 4
                  </Label>
                  <Input id="option2" value={result.Answer4} />
                </div>
                <DialogFooter>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="destructive">
                      <X className="mr-2 h-4 w-4" />
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EditExamDetails;
