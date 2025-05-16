"use client";
import CreatedRWATokenMintTable from "@/components/admin/CreatedRWATokenMintTable";
import CreateRwaMintForm from "@/components/minter/CreateRwaMintForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const AdminPage = () => {
  return (
    <>
      <CreateRwaMintForm />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreatedRWATokenMintTable />
        </CardContent>
      </Card>
    </>
  );
};

export default AdminPage;
