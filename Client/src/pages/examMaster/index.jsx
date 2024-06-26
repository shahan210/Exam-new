import { Copy, Delete, Edit, Edit2, PlusCircle, Printer, RefreshCcw, View } from "lucide-react";
import { useState, useEffect } from "react";
import InsertExamNew from "./components/InsertExamNew";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Label } from "../../components/ui/label";
import ModalComponent from "../../global/components/Modal";
import Layout from "../../global/components/Layout";
import getClassTable from "../../API/classMaster/getClassTable";
import { toast } from "react-toastify";
import getExamList from "../../API/examMaster/getExamList";
import { getSubjectTable } from "../../API/subjectMaster/getSubjectTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../global/GlobalContext";

export default function Exams() {
  const navigate = useNavigate();

  const { loading, setLoading, modalComponent, setModalComponent } = useGlobalContext();
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
  const [selectedQuestionTestID, setSelectedQuestionTestID] = useState(null);
  const [selected, setSelected] = useState(false);
  const [exam, setExam] = useState([]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const fetchClassess = async () => {
    const rightsString = localStorage.getItem("rights");
    const rights = rightsString.split(",").map((str) => str.trim());
    const id = 1551;
    if (!rights.includes(id.toString())) {
      toast.warning("Access Denied");
      navigate("/dashboard");
      return;
    }

    try {
      setLoading(true);

      const restriction = JSON.parse(localStorage.getItem("restrictedAccessSubject"));
      const admin = localStorage.getItem("restrictedAccess");
      if (admin == "access") {
        const result = await getClassTable("all");
        const filterClass = result[0]?.map((data) => ({
          id: data?.ClassId,
          name: data?.QstClass,
        }));
        setClassList(filterClass);
      } else if (admin == "denied") {
        setClassList("");
      } else if (admin == "yes") {
        const getSubID = restriction?.map((item) => item.ClassId);
        const result1 = await getClassTable(getSubID);
        const filterClass = result1[0]?.map((data) => ({
          id: data?.ClassId,
          name: data?.QstClass,
        }));
        setClassList(filterClass);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  const fetchSubjects = async () => {
    const rightsString = localStorage.getItem("rights");
    const rights = rightsString.split(",").map((str) => str.trim());
    const id = 1551;
    if (!rights.includes(id.toString())) {
      toast.warning("Access Denied");
      navigate("/dashboard");
      return;
    }
    try {
      setLoading(true);

      const restriction = JSON.parse(localStorage.getItem("restrictedAccessSubject"));
      const admin = localStorage.getItem("restrictedAccess");
      if (admin == "access") {
        const result = await getSubjectTable("all");
        const filterClass = result[0]?.map((data) => ({
          id: data?.SubjectID,
          name: data?.SubjectName,
        }));
        setSubjectList(filterClass);
      } else if (admin == "denied") {
        setSubjectList("");
      } else if (admin == "yes") {
        const getSubID = restriction?.map((item) => item.SubjectID);
        const result1 = await getSubjectTable(getSubID);
        const filterClass = result1[0]?.map((data) => ({
          id: data?.SubjectID,
          name: data?.SubjectName,
        }));
        setSubjectList(filterClass);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchClassess();
  }, []);

  const handleEdit = () => {
    // setShowModal(true);
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

  const handleRefresh = async () => {
    if (input?.className.id === "" || input?.subject.id === "") return toast.warn("Please select class and subject");

    try {
      const response = await getExamList(input);
      if (response) {
        setExam(response[0]);
      } else {
        setExam([]);
      }
    } catch (error) {
      toast.error(`${error}`);
      console.log(error);
    }
  };

  const handleRadioChange = (e) => {
    setSelectedQuestionTestID(e.target.value);
    setSelected(true);
  };

  const handleAddQuestion = () => {
    const rightsString = localStorage.getItem("rights");
    const rights = rightsString.split(",").map((str) => str.trim());
    const id = 1502;
    if (!rights.includes(id.toString())) {
      toast.warning("Access Denied");
      return;
    }
    navigate("/exam_master/add-new-ques", {
      state: {
        id: selectedQuestionTestID,
      },
    });
  };

  const handleViewQuestion = () => {
    const rightsString = localStorage.getItem("rights");
    const rights = rightsString.split(",").map((str) => str.trim());
    const id = 1503;
    if (!rights.includes(id.toString())) {
      toast.warning("Access Denied");
      return;
    }
    navigate("/exam_master/edit-exam-info", {
      state: {
        id: selectedQuestionTestID,
      },
    });
  };

  const handleTrue = (id) => {
    const rightsString = localStorage.getItem("rights");
    const rights = rightsString.split(",").map((str) => str.trim());
    const superAdmin = JSON.parse(localStorage.getItem("user"));

    if (superAdmin !== 6) {
      if (id == 0) {
        const newSub = 1552;
        if (!rights.includes(newSub.toString())) {
          toast.warning("Access Denied");
          return;
        }
      } else {
        const editSub = 1003;
        if (!rights.includes(editSub.toString())) {
          toast.warning("Access Denied");
          return;
        }
      }
    }
    setModalComponent(true);
  };

  return (
    <>
      <Layout>
        <form className="flex  flex-col">
          {/* <form onSubmit={handleFormSubmit} className="flex  flex-col"> */}
          <div className="flex flex-col w-full my-3">
            <div className="flex space-y-2 flex-col w-2/3">
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
                <Select defaultValue={input.className.name ? input.className.name : ""} onValueChange={(v) => handleSelect(v, "class")}>
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
                <Label htmlFor="subject" className="md:text-sm text-md">
                  Subject
                </Label>
                <Select defaultValue={input.subject.name ? input.subject.name : ""} onValueChange={(v) => handleSelect(v, "sub")}>
                  <SelectTrigger id="class" className="w-64">
                    <SelectValue placeholder={loading ? "Loading..." : "Choose Subject"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectList?.length > 0 &&
                      subjectList?.map((subject, ind) => {
                        const nameD = subject?.name;
                        return (
                          <SelectItem value={nameD} key={ind}>
                            {subject.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="button" className={"w-fit"} onClick={handleRefresh}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </form>

        <div className="w-full mt-2 px-5 py-4 flex flex-col md:flex-row border rounded-sm space-y-2 md:space-y-0 md:space-x-2">
          <button
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={() => handleTrue(0)}
          >
            {/* <Plus className="mr-2 h-4 w-4" /> */}
            Add New
          </button>
          {modalComponent && (
            <ModalComponent title={"Create exam"}>
              <div>
                <h1 className="text-center">Enter the form with necessary details</h1>
                <div className="w-full flex  justify-center">
                  <InsertExamNew />
                </div>
              </div>
            </ModalComponent>
          )}

          <Button onClick={handleEdit}>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button onClick={handleViewQuestion} className="flex items-center" disabled={!selected}>
            <View className="mr-2 h-4 w-4" />
            View/Change
          </Button>
          <Button onClick={handleAddQuestion} disabled={selectedQuestionTestID === null}>
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

        <div className="mt-2 border rounded-sm overflow-hidden">
          <Table className="min-w-full bg-white border border-gray-300">
            {exam && exam.length < 1 && !loading && <TableCaption className="text-center py-2 text-gray-700">No exam found</TableCaption>}
            {loading && <TableCaption className="text-center py-2 text-gray-700">Loading...</TableCaption>}
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
              {exam &&
                exam.map((data, ind) => {
                  return (
                    <TableRow key={ind} className="hover:bg-gray-100">
                      <TableCell className="px-2 py-2 font-medium">
                        <input
                          type="radio"
                          className="size-5"
                          value={data?.QuestionTestID}
                          onChange={handleRadioChange}
                          checked={selectedQuestionTestID == data.QuestionTestID ? true : false}
                        />
                      </TableCell>
                      <TableCell className="px-2 py-2">{data.ExamName}</TableCell>
                      <TableCell className="px-2 py-2">{data.AcaYear}</TableCell>
                      <TableCell className="px-2 py-2">{data.ClassName}</TableCell>
                      <TableCell className="px-2 py-2">{data.SubjectName}</TableCell>
                      <TableCell className="px-2 py-2">{data.ExamDate}</TableCell>
                      <TableCell className="px-2 py-2">
                        <Button type="button" asChild>
                          <div>
                            <Edit className="h-4 w-4 text-blue-500" />
                          </div>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Layout>
    </>
  );
}
