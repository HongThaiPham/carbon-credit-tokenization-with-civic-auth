"use client";
import React, { PropsWithChildren } from "react";
import SolanaProvider from "./SolanaProvider";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "../ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AppSidebar } from "../AppSidebar";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";

const queryClient = new QueryClient();

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaProvider>
        <Toaster richColors position="bottom-right" />
        <AppThemeProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {children}
              {/* <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Your Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div> */}
            </SidebarInset>
          </SidebarProvider>
        </AppThemeProvider>
        <ToastContainer />
      </SolanaProvider>
    </QueryClientProvider>
  );
};
