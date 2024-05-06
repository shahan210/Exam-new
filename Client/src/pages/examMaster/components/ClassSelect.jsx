/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import getClassTable from "../../../API/classMaster/getClassTable";

export default function ClassSelect({ handleChange, selected }) {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchClassData = async () => {
        setLoading(true);
        const response = await getClassTable();
        if (response.length > 0) {
            setClasses(response);
            setLoading(false);
        }
        setLoading(false);
        console.log(response, "result");
    };

    useEffect(() => {
        fetchClassData();
    }, []);

    return (
        <>
            <Select value={selected} onValueChange={(v) => handleChange(v)}>
                <SelectTrigger id="class" className="w-64">
                    <SelectValue placeholder={loading ? "Loading..." : "Choose Class"} />
                </SelectTrigger>
                <SelectContent>
                    {/* {classes &&
                        classes.map((c) => (
                            <SelectItem value={c.ItemCode.toString()} key={c.ItemCode}>
                                {c.ItemName}
                            </SelectItem>
                        ))} */}
                    <SelectItem value={30}>1</SelectItem>
                    <SelectItem value={30}>2</SelectItem>
                    <SelectItem value={30}>3</SelectItem>
                    <SelectItem value={30}>4</SelectItem>
                    <SelectItem value={30}>5</SelectItem>
                    <SelectItem value={30}>9</SelectItem>
                </SelectContent>
            </Select>
        </>
    );
}
