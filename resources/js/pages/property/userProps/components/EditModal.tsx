import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertySummary } from "../../type";

export default function EditModal({ property, onSuccess }: { property: PropertySummary, onSuccess: () => void }) {
  const { data, setData, put, processing, errors } = useForm({
    title: property.title,
    price: property.price,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('properties.update', property.id), {
      onSuccess: () => onSuccess(),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      </div>
      <Button type="submit" disabled={processing} className="w-full">
        Save Changes
      </Button>
    </form>
  );
}
