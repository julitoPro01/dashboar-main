// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {

  // await prisma.recordStatus.deleteMany();
  // await prisma.recordStatus.createMany({
  //   data: [
  //     { id: 1, name: "DRAFT" },
  //     { id: 2, name: "ACTIVE" }, { id: 3, name: "INACTIVE" }, { id: 4, name: "ARCHIVED" }, { id: 5, name: "DELETED" }]
  // })

  // await prisma.verificationStatus.deleteMany();
  // await prisma.verificationStatus.createMany({
  //   data: [{ id: 1, name: "DRAFT" }, { id: 2, name: "IN_REVIEW" }, { id: 3, name: "APPROVED" },
  //   { id: 4, name: "REJECTED" }, { id: 5, name: "SUSPENDED" }, { id: 6, name: "ARCHIVED" }
  //   ]
  // })

  // await prisma.role.deleteMany();
  // await prisma.role.createMany({
  //   data: [
  //     { name: "SUPER_ADMIN", level: 0 }, { name: "SYSTEM_ADMIN", level: 1 },
  //     { name: "PLATFORM_ADMIN", level: 10 }, { name: "PLATFORM_MANAGER", level: 11 },
  //     { name: "SUPPLIER_ADMIN", level: 20 }, { name: "SUPPLIER_MANAGER", level: 21 }, { name: "SUPPLIER_SALES", level: 22 },
  //     { name: "SUPPLIER_INVENTORY", level: 23 }, { name: "SUPPLIER_SUPPORT", level: 24 }, { name: "SUPPLIER_FINANCE", level: 25 }//...
  //   ]
  // })


  // await prisma.user.deleteMany()
  // await prisma.user.create({
  //   data: {
  //     firstName: "ploper",
  //     lastName: "plop",
  //     email: "super_admin@gmail.com",
  //     authentication: {
  //       create: {
  //         recordStatusId: 2,
  //         verificationStatusId: 3,
  //         email: "super_admin@gmail.com",
  //         passwordHash: bcrypt.hashSync("123456", 10),
  //         authMethod: "EMAIL",
  //         primaryRole: "SUPER_ADMIN",
  //         createdBy: "system",
  //         // userRoles:{create:{roleId:1}}
  //       }
  //     }
  //   }
  // })

  // await prisma.supplierUser.deleteMany()
  // await prisma.supplierUser.create({
  //   data: {
  //     recordStatusId: 2,
  //     operationalStatus: "NORMAL",
  //     firstName: "supplier",
  //     lastName: "simple plop",
  //     email: "supplier_admin@gmail.com",
  //     authentication: {
  //       create: {
  //         recordStatusId: 2,
  //         verificationStatusId: 3,
  //         email: "supplier_admin@gmail.com",
  //         passwordHash: bcrypt.hashSync("123456", 10),
  //         authMethod: "EMAIL",
  //         primaryRole: "SUPPLIER_ADMIN",
  //         createdBy: "system",
  //         // userRoles:{create:{roleId:2}}
  //       }
  //     }
  //   }
  // })

  // await prisma.currency.deleteMany();
  // await prisma.currency.createMany({
  //   data: [{ id: 1, code: "PEN", name: "Soles", symbol: "S/" }, { id: 2, code: "USD", name: "Dolar", symbol: "$" }, { id: 3, code: "EUR", name: "Euro", symbol: "..." }]
  // })

  // await prisma.productAttributeValue.deleteMany()
  // await prisma.product.deleteMany()

}

if (process.env.NODE_ENV !== 'production')
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })