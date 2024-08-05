import { RemoveButton } from "./RemoveButton";
import { getLsData } from "./actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { filesize } from "filesize";
import Link from "next/link";

export async function FileManager() {
  const lsData = await getLsData();

  const rows = Object.entries(lsData.files);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead className="bg-gray-200">
          <TableRow>
            <TableCell>File</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No Files
              </TableCell>
            </TableRow>
          )}
          {rows.map(([_, file]) => (
            <TableRow key={file.name} hover>
              <TableCell>
                <div>
                  <Link
                    href={`/file/${file.name}`}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {file.name}
                  </Link>
                </div>
                <div className="flex gap-2 text-gray-500 text-nowrap">
                  <span>
                    {dayjs(file.uploadAt).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                  <span>/</span>
                  <span> {filesize(file.size).toUpperCase()}</span>
                </div>
              </TableCell>
              <TableCell align="center">
                <RemoveButton file={file} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
