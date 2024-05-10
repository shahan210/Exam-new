import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getRights from "../../../API/users/getRights";

const UserEditContent = ({ getRightSelected, selected, id }) => {
  const { register, handleSubmit, setValue, reset, control } = useForm();
  const [loading, setLoading] = useState(true);
  const [rightslist, setRightsList] = useState("");

  const getRightsUser = async () => {
    if (loading) {
      try {
        const result = await getRights();
        // console.log(result[0]);
        setRightsList(result[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("error");
      }
    }
  };
  useEffect(() => {
    getRightsUser();
  }, [loading]);
  console.log(selected);
  return (
    <div className=" row-span-2">
      <div className="tableDiv !max-h-[830px]">
        <table className="table">
          <thead className="tableHead">
            <tr>
              <th scope="col" className="px-6 py-3">
                SI.NO{" "}
              </th>{" "}
              <th scope="col" className="px-6 py-3">
                Rights{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Module{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Select{" "}
              </th>
            </tr>
          </thead>
          <tbody className="text-black">
            {rightslist !== undefined &&
              rightslist.length > 0 &&
              rightslist?.map((subject, i) => {
                return (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "tableBody-1" : "tableBody-2"}
                  >
                    <td className="p-2 text-center">{i + 1}</td>
                    <td className="p-2">{subject?.remark}</td>
                    <td className="p-2">{subject?.mdule}</td>
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        onClick={() => getRightSelected(subject.id)}
                        defaultChecked={
                          id !== 0
                            ? selected?.filter((item) => item == subject?.id)
                                .length !== 0 && true
                            : false
                        }
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
};

export default UserEditContent;
