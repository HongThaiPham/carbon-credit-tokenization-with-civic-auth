import IssueNftForm from "@/components/admin/IssueNftForm";
import UserRoleAccounts from "@/components/admin/UserRoleAccounts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NFTRole } from "@/lib/constants";
import { Plus, Users } from "lucide-react";
import React from "react";

type Props = {
  params: Promise<{ mintpubkey: string }>;
};

const MintPage: React.FC<Props> = async ({ params }) => {
  const { mintpubkey } = await params;
  return (
    <div className="container mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Grant MINTER
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IssueNftForm role={NFTRole.MINTER} mint={mintpubkey} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <UserRoleAccounts role={NFTRole.MINTER} mint={mintpubkey} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MintPage;
