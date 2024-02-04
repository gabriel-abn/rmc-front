import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import fetch from "@/fetch/http";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export function Combobox(props: { tags: string[] }) {
  const { tags } = props;
  const tagsWithValue = tags.map((tag) => ({ label: tag, value: tag }));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? tagsWithValue.find((tag) => tag.value === value)?.label
            : "Select tag..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            {tagsWithValue.map((tag) => (
              <CommandItem
                key={tag.value}
                value={tag.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === tag.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {tag.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function EditTags(props: { tags: string[] }) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetch({ url: "/utils/tags/" })
      .GET()
      .then((res: string[]) => setTags(res));
  }, [tags]);

  async function updateTags(newTag: string) {
    fetch({
      url: "/account/profile/",
      data: { tags: [...tags, newTag] },
    })
      .POST()
      .then((res) => {
        props.tags.push(newTag);
        console.log(res);
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Edit Tags</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tags</DialogTitle>

          <DialogDescription>
            Add or remove tags from your profile.
          </DialogDescription>

          <div className="flex flex-row space-x-1">
            {props.tags.map((tag) => (
              <Badge key={tag}>{"#" + tag}</Badge>
            ))}
          </div>
        </DialogHeader>

        <div>
          <Combobox tags={tags} />
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
