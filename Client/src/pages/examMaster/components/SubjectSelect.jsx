import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

export default function SubjectSelect({ handleChange, selected }) {
    // useEffect(() => {
    //     const subjectForm = new FormData();
    //     subjectForm.append("title", "GetSubjectList");
    //     subjectForm.append("description", "Request For Stock Item Display List");
    //     performRequest(subjectForm);
    // }, []);
    return (
        <>
            <Select value={selected} onValueChange={(v) => handleChange(v)}>
                <SelectTrigger id="class" className="w-64">
                    <SelectValue placeholder={"Choose Subject"} />
                    {/* <SelectValue placeholder={loading ? "Loading..." : "Choose Subject"} /> */}
                </SelectTrigger>
                <SelectContent>
                    {/* {subjects &&
                        subjects.map((subject) => (
                            <SelectItem value={subject.ItemCode.toString()} key={subject.ItemCode}>
                                {subject.ItemName}
                            </SelectItem>
                        ))} */}
                        <SelectItem value={1} >
                            2
                        </SelectItem>
                        <SelectItem value={1} >
                            3
                        </SelectItem>
                        <SelectItem value={1} >
                            6
                        </SelectItem>
                        <SelectItem value={1} >
                            7
                        </SelectItem>
                </SelectContent>
            </Select>
        </>
    );
}
