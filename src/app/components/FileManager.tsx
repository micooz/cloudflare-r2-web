import { RemoveButton } from "./RemoveButton";
import { list } from "./actions";
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
  const files = await list();

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
          {files.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No Files
              </TableCell>
            </TableRow>
          )}
          {files.map((file) => (
            <TableRow key={file.key} hover>
              <TableCell>
                <div>
                  <Link
                    href={`/file/${file.key}`}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {file.name}
                  </Link>
                </div>
                <div className="flex gap-2 text-gray-500 text-nowrap">
                  <span>
                    {dayjs(file.uploaded).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                  <span>/</span>
                  <span>{filesize(file.size).toUpperCase()}</span>
                </div>
              </TableCell>
              <TableCell align="right">
                <RemoveButton file={file} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
