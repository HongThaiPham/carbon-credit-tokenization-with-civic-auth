"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BadgePlusIcon, Loader2, SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import useInitRwaToken from "@/hooks/useInitRwaToken";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters long",
    })
    .max(20, {
      message: "Name must be at most 20 characters long",
    }),
  symbol: z
    .string()
    .min(3, {
      message: "Symbol must be at least 3 characters long",
    })
    .max(5, {
      message: "Symbol must be at most 5 characters long",
    }),
  decimals: z.coerce
    .number()
    .min(0, {
      message: "Decimals must be at least 0",
    })
    .max(9, {
      message: "Decimals must be at most 18",
    })
    .optional(),
  isClose: z.boolean().optional(),
  hasFee: z.boolean().optional(),
  transferFeeBasisPoints: z.coerce
    .number()
    .min(0, {
      message: "Transfer fee basis points must be at least 0", // ~ (0-100%)
    })
    .max(10000, {
      message: "Transfer fee basis points must be at most 10000",
    })
    .optional(),
  maximumFee: z.coerce
    .number()
    .min(0, {
      message: "Maximum fee must be at least 0",
    })
    .optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CreateRwaMintForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: 0,
      isClose: false,
      hasFee: false,
      transferFeeBasisPoints: 0,
      maximumFee: 0,
    },
  });

  const hasFee = form.watch("hasFee");

  const { mutateAsync, isPending } = useInitRwaToken();

  async function onSubmit(values: FormSchemaType) {
    try {
      await mutateAsync({
        name: values.name,
        symbol: values.symbol,
        decimals: values.decimals ?? 9,
        isClose: values.isClose ?? false,
        hasFee: values.hasFee ?? false,
        transferFeeBasisPoints: values.transferFeeBasisPoints ?? 0,
        maximumFee: values.maximumFee ?? 0,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgePlusIcon className="h-5 w-5" /> Create new Carbon Credit Token
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token name</FormLabel>
                  <FormControl>
                    <Input placeholder="Carbon Credit Token" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the token that will be displayed to
                    users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="CCT" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the symbol of the token that will be displayed to
                    users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="decimals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token decimals</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Decimals" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the number of decimals that the token will have.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isClose"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      id="isClose"
                      checked={field.value}
                      onCheckedChange={(e) => field.onChange(!!e.valueOf())}
                    />
                  </FormControl>
                  <FormLabel htmlFor="isClose">
                    Limit access to this token
                  </FormLabel>
                  <FormDescription>
                    User must be approved to trade this token
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasFee"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      id="hasFee"
                      checked={field.value}
                      onCheckedChange={(e) => field.onChange(!!e.valueOf())}
                    />
                  </FormControl>
                  <FormLabel htmlFor="hasFee">Token has transfer fee</FormLabel>
                  <FormDescription>
                    A fee will be charged on every transfer
                  </FormDescription>
                </FormItem>
              )}
            />

            {hasFee ? (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="transferFeeBasisPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transfer fee basis points</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Transfer fee basis points (0-10000) ~ (0-100%)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        How many percentage points to charge on transfer. 10000
                        = 100%
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maximumFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum fee</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Maximum fee in token base units"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum fee in token base units. This is the maximum fee
                        that will be charged on transfer.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <SendIcon className="h-4 w-4" />
              )}
              Create Token
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateRwaMintForm;
