/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ServerResponse } from "@/pages/types";
import { PropertySummary, UserProperties } from "../type";
import EditModal from "./components/EditModal";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props extends ServerResponse<UserProperties> {}

export default function Page({ data }: Props) {
  const [propForEdit, setPropForEdit] = useState<PropertySummary|null>(null)
  return (
    <div>
      {data.properties.map((prop) => (
        <div>
          {/* //& prop data */}
            <div className="flex gap-5">
              <img src={prop.thumbnail} alt="thumb" />
              <p>{prop.title}</p>
              <span className="p-3 bg-green-500/50 font-white">{prop.category}</span>
              <span>{prop.likes_count}</span>
              <span>{prop.comments_count}</span>
            </div>
          {/* //& action buttons */}
            <div>
              <button onClick={() => setPropForEdit(prop)}>تعدليل</button>
              <button>حذف</button>
            </div>
        </div>
      ))}
      {/* //& the edit dialog */}
        <Dialog open={!!propForEdit} onOpenChange={() => setPropForEdit(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Property</DialogTitle>
            </DialogHeader>
            
            {/* Render the form only if we have a property */}
            {propForEdit && (
              <EditModal 
                property={propForEdit} 
                onSuccess={() => setPropForEdit(null)} 
              />
            )}
          </DialogContent>
        </Dialog>
    </div>
  );
}