import { createGuideline } from "@/API/guideline.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";


export const GuidelineButton = ({value,type,title}:{value:string,title:string,type:string}) => {

    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
      mutationFn: createGuideline,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["terms"] }),
    });
  
    const handleSubmit = async () => {
      if (!value) return toast.error("Content is required");
      const { success, response } = await mutateAsync({
        type,
        content: value,
        title
      });
      if (!success) return toast.error(response);
      toast.success("Content updated");
    };
    return (
      <Button
        onClick={handleSubmit}
        className="bg-[#395E66] px-24 py-6 hover:bg-[#395e66b9]"
        disabled={isPending}
      >
        Save
      </Button>
    )
  }
  