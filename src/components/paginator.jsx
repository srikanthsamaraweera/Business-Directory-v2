// Paginator.js
import { Button } from "@nextui-org/react";

export default function Paginator({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-3 text-center">
      <Button
        className="bg-[#E429A9] font-khand text-white italic hover:cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </Button>
      <span className="italic">
        {" "}
        Page {currentPage} of {totalPages}{" "}
      </span>
      <Button
        className="bg-[#E429A9] font-khand text-white italic hover:cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </Button>
    </div>
  );
}
