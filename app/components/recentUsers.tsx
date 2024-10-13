import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import prisma from "../lib/db"
  
  export async function RecentUsers() {
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      }
    })
  
    return (
      <div className="space-y-8">
        {recentUsers.map((user, index) => (
          <div className="flex items-center" key={index}>
            <Avatar className="h-9 w-9">
              <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }