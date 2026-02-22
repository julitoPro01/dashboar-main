// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {

  // await prisma.attributeDefinition.deleteMany();
  // await prisma.attributeDefinition.createMany({
  //   data: [
  //     { createdBy: "system", name: "Color", isActive: true, dataType: "VARCHAR", toProduct: false, },
  //     { createdBy: "system", name: "Talla", isActive: true, dataType: "VARCHAR", toProduct: false },
  //     { createdBy: "system", name: "Modelo", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Capacidad", isActive: false, dataType: "VARCHAR", toProduct: false },
  //     { createdBy: "system", name: "Edad", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad1", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad12", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad13", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad14", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad15", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad116", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad117", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad118", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad119", isActive: true, dataType: "DATE" },
  //     { createdBy: "system", name: "Edad120", isActive: true, dataType: "DECIMAL" },
  //     { createdBy: "system", name: "Edad123", isActive: true, dataType: "INT" },
  //     { createdBy: "system", name: "Edad124", isActive: true, dataType: "BOOLEAN" },
  //     { createdBy: "system", name: "Edad125", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad125", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad125", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad125", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad125", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad125", isActive: true, dataType: "VARCHAR" },
  //     { createdBy: "system", name: "Edad125", isActive: true, dataType: "VARCHAR", description: "hello word!" },
  //   ]
  // })

  // await prisma.category.deleteMany()
  await prisma.recordStatus.deleteMany();
  await prisma.recordStatus.createMany({
    data:[{id:1, name:"ACTIVE"},{id:3,name:"ARCHIVED"}, {id:2, name:"INACTIVE"}, {id:4, name:"DELETED"}]
  })
  // await prisma.verificationStatus.deleteMany();
  await prisma.verificationStatus.createMany({
    data: [{ id: 1, name: "APPROVED" }, { id: 6, name: "ARCHIVED" }, { id: 7, name: "DRAFT" }, { id: 2, name: "PENDING_REVIEW" },
    { id: 4, name: "REJECTED" }, { id: 5, name: "SUSPENDED" }, { id: 3, name: "UNDER_REVIEW" }
    ]
  })

 

  // await prisma.supplierUser.deleteMany()
  // await prisma.user.deleteMany()
  // await  prisma.supplier.deleteMany()
  // await prisma.userAuthentication.deleteMany()

  //  await prisma.userRole.deleteMany()
  // await prisma.role.deleteMany();

  await prisma.role.createMany({
    data: [
      { name: "SUPER_ADMIN", level: 0 }, { name: "SYSTEM_ADMIN", level: 1 },
      { name: "PLATFORM_ADMIN", level: 10 }, { name: "PLATFORM_MANAGER", level: 11 },
      { name: "SUPPLIER_ADMIN", level: 20 }, { name: "SUPPLIER_MANAGER", level: 21 }, { name: "SUPPLIER_SALES", level: 22 },
      { name: "SUPPLIER_INVENTORY", level: 23 }, { name: "SUPPLIER_SUPPORT", level: 24 }, { name: "SUPPLIER_FINANCE", level: 25 }//...
    ]
  })


  await prisma.user.create({
    data: {
      firstName: "ploper",
      lastName: "plop",
      email: "super_admin@gmail.com",
      authentication: {
        create: {
          recordStatusId: 1,
          verificationStatusId: 1,
          email: "super_admin@gmail.com",
          passwordHash: bcrypt.hashSync("123456", 10),
          authMethod: "EMAIL",
          primaryRole: "SUPER_ADMIN",
          createdBy: "system",
          // userRoles:{create:{roleId:1}}
        }
      }
    }
  })

  await prisma.supplierUser.create({
    data: {
      recordStatusId: 1,
      operationalStatus: "NORMAL",
      firstName: "supplier",
      lastName: "simple plop",
      email: "supplier_admin@gmail.com",
      authentication: {
        create: {
          recordStatusId: 1,
          verificationStatusId: 1,
          email: "supplier_admin@gmail.com",
          passwordHash: bcrypt.hashSync("123456", 10),
          authMethod: "EMAIL",
          primaryRole: "SUPPLIER_ADMIN",
          createdBy: "system",
          // userRoles:{create:{roleId:2}}
        }
      }
    }
  })

  // await prisma.inventoryStatus.deleteMany();
  // await prisma.inventoryStatus.createMany({
  //   data:[{id:1,name:"IN_STOCK"},{id:4, name:"IN_TRANSIT"},{id:2, name:"OUT_OF_STOCK"},{id:3, name:"PENDING_RESTOCK"},{id:5,name:"RESERVED"}]
  // })

  // await prisma.saleStatus.deleteMany();
  // await prisma.saleStatus.createMany({
  //   data:[{id:1, name:"AVAILABLE"},{id:2, name:"COMING_SOON"},{id:3, name:"DISCONTINUED"},{id:4, name:"MADE_TO_ORDER"}]
  // })
  // await prisma.currency.deleteMany();
  // await prisma.currency.createMany({
  //   data:[{id:1, code:"PEN", name:"Soles", symbol:"S/"},{id:2, code:"USD", name:"Dolar", symbol:"$"},{id:3, code:"EUR", name:"Euro", symbol:"..."}]
  // })
  // await prisma.supplierUser.deleteMany()
  // await prisma.supplier.deleteMany()
  // await prisma.categoryAttribute.deleteMany()
  // await prisma.category.deleteMany()
  // await prisma.productCategory.deleteMany()
  // await prisma.productCategory.deleteMany()
  // await prisma.variantAttributeValue.deleteMany()
  // await prisma.productVariant.deleteMany()
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