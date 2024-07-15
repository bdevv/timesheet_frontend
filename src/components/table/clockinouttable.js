import PlusIcon from "../icons/plus";
import MinusIcon from "../icons/minus";
import moment from "moment";

export default function ClockInOutTable({ rows, onExpandRow }) {
  const columns = [
    { field: "id", headerName: "*", flex: 1, minWidth: 150 },
    { field: "clockInTime", headerName: "Clock In", flex: 1, minWidth: 100 },
    { field: "clockOutTime", headerName: "Clock Out", flex: 1, minWidth: 100 },
    { field: "workingHours", headerName: "Duration", flex: 1, minWidth: 100 },
    { field: "breaking", headerName: "Breaking", flex: 1, minWidth: 100 },
    { field: "paidBreaking", headerName: "Paid", flex: 1, minWidth: 100 },
  ];
  console.log(rows);
  return (
    <div className="clock-table-container min-w-[400px] h-full ">
      <table className="bg-white">
        <thead>
          <tr>
            {columns.map((item) => {
              return <th>{item.headerName}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <>
                <tr>
                  <td>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        onExpandRow(row);
                      }}
                    >
                      {row.expanded === true ? (
                        <MinusIcon width={15} height={15} color={"#000000"} />
                      ) : (
                        <PlusIcon width={15} height={15} color={"#000000"} />
                      )}
                    </div>
                  </td>
                  <td>{row.clockInTime}</td>
                  <td>{row.clockOutTime}</td>
                  <td>{row.workingHours}</td>
                  <td>{row.breaking}</td>
                  <td>{row.paidBreaking}</td>
                </tr>
                {row.expanded === true && (
                  <tr>
                    <td colSpan={6} className="w-full h-full px-4 py-2">
                      <div className="w-full h-full flex flex-col px-4 py-2 bg-white rounded-md items-center justify-center">
                        <span className="text-green-500">Breakings</span>
                        <table className="bg-white mt-2">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Paid</th>
                              <th>Break In</th>
                              <th>Break Out</th>
                              <th>Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.breaks.map((item) => {
                              return (
                                <tr>
                                  <td>{item.break_id.name}</td>
                                  <td>{item.break_id.isPaid ? "Paid" : "Unpaid"}</td>
                                  <td>{moment(item.breakInTimeStamp).local().format("HH:mm")}</td>
                                  <td>{moment(item.breakOutTimeStamp).local().format("HH:mm")}</td>
                                  <td>{((moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp)) / 1000 / 60).toFixed(0) + " mins"}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
