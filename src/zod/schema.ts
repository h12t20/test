import {z} from "zod";
import dayjs, {Dayjs} from "dayjs";

export const tableRowSchema = z.object({
    key: z.any(),
    name: z.string()
        .min(1, { message: 'Поле обязательно для заполнения' })
        .max(50, { message: 'Допускается не более 50 символов'})
        .refine((val) => val.trim().length > 0, { message: 'Поле не может состоять только из пробелов' })
        .refine((val) => /[a-zA-Zа-яА-Я]/.test(val), { message: 'Допускаются только буквы' }),
    date: z
            .custom<Dayjs>((val) => dayjs.isDayjs(val), "Выберите дату")
            .refine((val) => val.isValid(), "Некорректная дата"),
    age: z
        .string() // Антед Input возвращает строку
        .min(1, 'Обязательное поле')
        .refine((val) => !isNaN(parseFloat(val)), { message: 'Должно быть числом' })
        .refine((val) => +val>18 , { message: 'Должно быть больше 18' })
        .refine((val) => Number.isInteger(+val) , { message: 'Должно быть целое число' })
        .refine((val) => (+val>18) && (+val<100) , { message: 'Возраст должен быть больше 18 и меньше 100' })
});

export type RowFormType = z.infer<typeof tableRowSchema>;