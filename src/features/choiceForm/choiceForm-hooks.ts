import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { useRouter } from "next/router";
import { IDecision } from "../../common/types/decision-types";

export default function useChoiceForm<T extends IDecision>(
  initialValues: T,
  validate: FormValidateInput<T>
) {
  const router = useRouter();
  const form = useForm<T>({
    initialValues,
    validate,
  });

  const formHelpers = {
    removeChoice(id: number) {
      form.removeListItem("choices", id);
    },
    addChoice() {
      if (form.values.choices.length < 100) {
        form.insertListItem("choices", {
          id: form.values.choices.length,
          name: "",
        });
      } else {
        alert("Maximum 100 choices");
      }
    },
    decide() {
      form.values.choices = form.values.choices.filter(
        (i) => i.name.trim() != ""
      );
      if (form.values.choices.length < 2)
        form.values.choices = initialValues.choices;
      form.validateField("choices").hasError
        ? alert(form.validateField("choices").error)
        : null;
    },
    cancel() {
      router.back();
    },
  };

  return {
    form,
    formHelpers,
  };
}
