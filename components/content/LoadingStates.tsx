"use client"

import { Skeleton } from "../ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 md:mt-0 h-10 w-44" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
                <div className="mt-4 flex justify-between items-center">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PostsListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="mt-4 md:mt-0 h-10 w-44" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-10 w-full md:w-2/3" />
            <Skeleton className="h-10 w-full md:w-1/3" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium"><Skeleton className="h-4 w-16" /></th>
                  <th className="pb-3 font-medium"><Skeleton className="h-4 w-16" /></th>
                  <th className="pb-3 font-medium"><Skeleton className="h-4 w-16" /></th>
                  <th className="pb-3 font-medium"><Skeleton className="h-4 w-16" /></th>
                  <th className="pb-3 font-medium text-right"><Skeleton className="h-4 w-16 ml-auto" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="py-4 pr-4">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-3 w-64 mt-1" />
                    </td>
                    <td className="py-4">
                      <Skeleton className="h-5 w-16" />
                    </td>
                    <td className="py-4 text-sm">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="py-4 text-sm">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="py-4 text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PostDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4 space-y-6">
          <Card>
            <CardHeader className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-64 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-1/4 space-y-4">
          <Card>
            <CardHeader className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
              <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Skeleton className="h-4 w-4 mt-0.5 mr-2" />
                  <div>
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-32 mt-1" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Skeleton className="h-4 w-4 mt-0.5 mr-2" />
                  <div>
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-32 mt-1" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function TemplatesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-8 w-36" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-32" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 