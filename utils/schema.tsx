import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    //   "Password must include uppercase, lowercase, number and special symbol"
    // ),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
