import "drizzle-orm/bun-sqlite";
import "bun:sqlite";
import * as drizzle_orm_sqlite_core0 from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm";
import { z } from "zod";

//#region src/database/schema.d.ts
declare const usersTable: drizzle_orm_sqlite_core0.SQLiteTableWithColumns<{
  name: "users";
  schema: undefined;
  columns: {
    id: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "id";
      tableName: "users";
      dataType: "number";
      columnType: "SQLiteInteger";
      data: number;
      driverParam: number;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: true;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    role: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "role";
      tableName: "users";
      dataType: "string";
      columnType: "SQLiteText";
      data: "admin" | "user";
      driverParam: string;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: ["admin", "user"];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: number | undefined;
    }>;
    name: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "name";
      tableName: "users";
      dataType: "string";
      columnType: "SQLiteText";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: undefined;
    }>;
    code: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "code";
      tableName: "users";
      dataType: "string";
      columnType: "SQLiteText";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: undefined;
    }>;
    createdAt: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "created_at";
      tableName: "users";
      dataType: "date";
      columnType: "SQLiteTimestamp";
      data: Date;
      driverParam: number;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
  };
  dialect: "sqlite";
}>;
type User = InferSelectModel<typeof usersTable>;
type UserRole = User['role'];
type UserDTO = Omit<User, 'code'>;
declare const settingsTable: drizzle_orm_sqlite_core0.SQLiteTableWithColumns<{
  name: "settings";
  schema: undefined;
  columns: {
    id: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "id";
      tableName: "settings";
      dataType: "number";
      columnType: "SQLiteInteger";
      data: number;
      driverParam: number;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: true;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    key: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "key";
      tableName: "settings";
      dataType: "string";
      columnType: "SQLiteText";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: undefined;
    }>;
    value: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "value";
      tableName: "settings";
      dataType: "string";
      columnType: "SQLiteText";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: undefined;
    }>;
  };
  dialect: "sqlite";
}>;
type Setting = InferSelectModel<typeof settingsTable>;
type SettingDTO = Setting;
declare const smtLinesTable: drizzle_orm_sqlite_core0.SQLiteTableWithColumns<{
  name: "smt_lines";
  schema: undefined;
  columns: {
    id: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "id";
      tableName: "smt_lines";
      dataType: "number";
      columnType: "SQLiteInteger";
      data: number;
      driverParam: number;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: true;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    userId: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "user_id";
      tableName: "smt_lines";
      dataType: "number";
      columnType: "SQLiteInteger";
      data: number;
      driverParam: number;
      notNull: false;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    board: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "board";
      tableName: "smt_lines";
      dataType: "string";
      columnType: "SQLiteText";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: undefined;
    }>;
    comment: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "comment";
      tableName: "smt_lines";
      dataType: "string";
      columnType: "SQLiteText";
      data: string;
      driverParam: string;
      notNull: false;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: undefined;
    }>;
    count: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "count";
      tableName: "smt_lines";
      dataType: "number";
      columnType: "SQLiteInteger";
      data: number;
      driverParam: number;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    timeStart: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "time_start";
      tableName: "smt_lines";
      dataType: "date";
      columnType: "SQLiteTimestamp";
      data: Date;
      driverParam: number;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    timeEnd: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "time_end";
      tableName: "smt_lines";
      dataType: "date";
      columnType: "SQLiteTimestamp";
      data: Date;
      driverParam: number;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    createdAt: drizzle_orm_sqlite_core0.SQLiteColumn<{
      name: "created_at";
      tableName: "smt_lines";
      dataType: "date";
      columnType: "SQLiteTimestamp";
      data: Date;
      driverParam: number;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
  };
  dialect: "sqlite";
}>;
type SMTLine = InferSelectModel<typeof smtLinesTable>;
type SMTLineDTO = SMTLine;
//#endregion
//#region src/modules/auth/schemas/login.schema.d.ts
declare const LoginSchema: z.ZodObject<{
  code: z.ZodString;
}, z.core.$strip>;
type LoginData = z.infer<typeof LoginSchema>;
//#endregion
//#region src/modules/auth/schemas/register.schema.d.ts
declare const RegisterSchema: z.ZodObject<{
  name: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
  code: z.ZodString;
}, z.core.$strip>;
type RegisterData = z.infer<typeof RegisterSchema>;
//#endregion
//#region src/modules/settings/schemas/get-setting.schema.d.ts
declare const GetSettingSchema: z.ZodObject<{
  key: z.ZodString;
}, z.core.$strip>;
type GetSettingData = z.infer<typeof GetSettingSchema>;
//#endregion
//#region src/modules/settings/schemas/set-setting.schema.d.ts
declare const SetSettingSchema: z.ZodObject<{
  key: z.ZodString;
  value: z.ZodString;
}, z.core.$strip>;
type SetSettingData = z.infer<typeof SetSettingSchema>;
//#endregion
//#region src/modules/smt-lines/schemas/create-smt-line.schema.d.ts
declare const CreateSMTLineSchema: z.ZodObject<{
  board: z.ZodString;
  count: z.ZodNumber;
  comment: z.ZodOptional<z.ZodString>;
  timeStart: z.ZodNumber;
  timeEnd: z.ZodNumber;
}, z.core.$strip>;
type CreateSMTLineData = z.infer<typeof CreateSMTLineSchema>;
//#endregion
//#region src/modules/smt-lines/schemas/delete-smt-line.schema.d.ts
declare const DeleteSMTLineSchema: z.ZodObject<{
  id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
type DeleteSMTLineData = z.infer<typeof DeleteSMTLineSchema>;
//#endregion
//#region src/modules/smt-lines/schemas/get-smt-lines.schema.d.ts
declare const GetSMTLinesSchema: z.ZodObject<{
  page: z.ZodDefault<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
  limit: z.ZodDefault<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
}, z.core.$strip>;
type GetSMTLinesData = z.infer<typeof GetSMTLinesSchema>;
//#endregion
//#region src/modules/users/schemas/delete-user.schema.d.ts
declare const DeleteUserSchema: z.ZodObject<{
  id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
type DeleteUserData = z.infer<typeof DeleteUserSchema>;
//#endregion
//#region src/modules/users/schemas/get-users.schema.d.ts
declare const GetUsersSchema: z.ZodObject<{
  search: z.ZodOptional<z.ZodString>;
  page: z.ZodDefault<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
  limit: z.ZodDefault<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
}, z.core.$strip>;
type GetUsersData = z.infer<typeof GetUsersSchema>;
//#endregion
export { CreateSMTLineData, CreateSMTLineSchema, DeleteSMTLineData, DeleteSMTLineSchema, DeleteUserData, DeleteUserSchema, GetSMTLinesData, GetSMTLinesSchema, GetSettingData, GetSettingSchema, GetUsersData, GetUsersSchema, LoginData, LoginSchema, RegisterData, RegisterSchema, type SMTLineDTO, SetSettingData, SetSettingSchema, type SettingDTO, type UserDTO, type UserRole };