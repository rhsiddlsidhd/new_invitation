"use client";
import React, { useActionState } from "react";
import { deleteUserAction } from "../../../actions/user";

import Box from "../../layout/Box";
import Label from "../../atoms/Label";
import Input from "../../atoms/Input";
import Alert from "../../atoms/Alert";
import Btn from "../../atoms/Btn";

const DeleteForm = ({ user }: { user: string }) => {
  const [state, action, pending] = useActionState(deleteUserAction, null);

  return (
    <div className="flex h-screen items-center justify-center">
      <Box className="w-full max-w-[400px]">
        <h2>계정 삭제</h2>
        <form action={action}>
          {state && !state.success && (
            <Alert type="error" className="mt-2">
              {state.message}
            </Alert>
          )}
          <div className="my-2">
            <Label htmlFor="userId">아이디</Label>
            <Input
              type="text"
              id="userId"
              placeholder={user}
              autoComplete="off"
              name="userId"
              required
            />
          </div>

          <Btn
            type="submit"
            pending={pending}
            bgColor="bg-[#007bff]"
            className="w-full"
          >
            {pending ? "삭제 중..." : "삭제"}
          </Btn>
        </form>
      </Box>
    </div>
  );
};

export default DeleteForm;
