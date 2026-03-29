import {z} from "zod";
import dayjs, {Dayjs} from "dayjs";

export const tableRowSchema = z.object({
    key: z.any(),
    name: z.string()
        .min(1, { message: 'Поле обязательно для заполнения' })
        .max(30, { message: 'Допускается не более 30 символов'})
        .refine((val) => val.trim().length > 0, { message: 'Поле не может состоять только из пробелов' })
        .refine((val) => /[a-zA-Zа-яА-Я]/.test(val), { message: 'Допускаются только буквы' }),
    date: z
        .custom<Dayjs>((val) => dayjs.isDayjs(val), "Выберите дату")
        .refine((val) => val.isValid(), "Некорректная дата"),
    age: z
        .number({ message: "Некорректный возраст" })
        .min(1, 'Обязательное поле')
        .refine((val) => val>18 , { message: 'Слишком маленький' })
        .refine((val) => val<100 , { message: 'Слишком старый' })
});

export type RowFormType = z.infer<typeof tableRowSchema>;