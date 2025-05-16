"use client";
import CreatedRWATokenMintTable from "@/components/admin/CreatedRWATokenMintTable";
import CreateRwaMintForm from "@/components/minter/CreateRwaMintForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const AdminPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="container mx-auto p-8 space-y-6">
        <CreateRwaMintForm />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CreatedRWATokenMintTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
