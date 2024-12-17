import React from "react";

type Props = {
  totalItems: number;
  itemPerPage: number;
};

const UserTableFooter = ({ totalItems, itemPerPage }: Props) => {
  const totalPageNum = Math.ceil(totalItems / itemPerPage);

  return (
    <tfoot className="user-list-footer">
      <tr className="w-full">
        <td className="w-full flex flex-row items-center justify-center">ss</td>
      </tr>
    </tfoot>
  );
};

export default UserTableFooter;
