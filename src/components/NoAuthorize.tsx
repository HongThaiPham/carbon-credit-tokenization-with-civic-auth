import React from "react";

const NoAuthorize = () => {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="flex justify-center items-center border rounded-md h-64 text-orange-500 text-2xl">
        You are not authorized to view this page.
      </div>
    </div>
  );
};

export default NoAuthorize;
