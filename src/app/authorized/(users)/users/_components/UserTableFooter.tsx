import React from "react";

type Props = {
  totalItems: number;
  itemPerPage: number;
};

const UserTableFooter = ({ totalItems, itemPerPage }: Props) => {
  const totalPageNum = Math.ceil(totalItems / itemPerPage);
  return (
    <tfoot className="user-list-footer">
      <tr>
        <td>77</td>
      </tr>
    </tfoot>
  );
};

export default UserTableFooter;
