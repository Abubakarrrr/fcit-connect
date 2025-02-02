import React from "react";
import { FormInput } from "./form-input";
import { FormTextarea } from "./form-textarea";
import DynamicSelect from "./SelectWithSearch";
import SimpleSelect from "./SimpleSelect";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { useProjectStore } from "@/store/projectStore";


const departments = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Data Science",
];

const years = Array.from({ length: 2024 - 2019 + 1 }, (_, i) =>
  (2024 - i).toString()
);

export default function FypForm({ formState, onChange, errors }) {
  const {categories,supervisors} = useProjectStore();

  return (
    <div className="space-y-6">
      <FormInput
        id="templateName"
        label="Name of your FYP"
        placeholder="Enter FYP name"
        value={formState.templateName || ""}
        onChange={(e) => onChange("templateName", e.target.value)}
      />
      <ErrorMessage message={errors.templateName} />

      <FormTextarea
        id="description"
        label="FYP Description"
        placeholder="Enter FYP description"
        value={formState.description || ""}
        onChange={(e) => onChange("description", e.target.value)}
      />
      <ErrorMessage message={errors.description} />

      <div className="grid  gap-4">
        <SimpleSelect
          labelText="Select Campus"
          placeholderText="Select Campus"
          items={["NC", "OC"]}
          value={formState.campus || ""}
          onChange={(value) => onChange("campus", value)}
        />
        <ErrorMessage message={errors.campus} />

        <SimpleSelect
          labelText="Select Department"
          placeholderText="Select Department"
          items={departments}
          value={formState.department || ""}
          onChange={(value) => onChange("department", value)}
        />
        <ErrorMessage message={errors.department} />

        <SimpleSelect
          labelText="Select Year"
          placeholderText="Select Year"
          items={years}
          value={formState.year || ""}
          onChange={(value) => onChange("year", value)}
        />
        <ErrorMessage message={errors.year} />
      </div>

      <FormInput
        id="deployedLink"
        label="Deployed Link"
        placeholder="https://fcit-connect.vercel.app"
        value={formState.deployedLink || ""}
        onChange={(e) => onChange("deployedLink", e.target.value)}
      />
      <ErrorMessage message={errors.deployedLink} />

      <FormInput
        id="githubLink"
        label="GitHub Link"
        placeholder="https://github.com/Abubakarrrr/fcit-connect"
        value={formState.githubLink || ""}
        onChange={(e) => onChange("githubLink", e.target.value)}
      />
      <ErrorMessage message={errors.githubLink} />

      <FormInput
        id="figmaLink"
        label="Figma Link"
        placeholder="https://www.figma.com"
        value={formState.figmaLink || ""}
        onChange={(e) => onChange("figmaLink", e.target.value)}
      />
      <ErrorMessage message={errors.figmaLink} />

      <DynamicSelect
        labelText="Select Category"
        emptyText="No categories"
        items={categories || []}
        value={formState.category || ""}
        onChange={(value) => onChange("category", value)}
      />
      <ErrorMessage message={errors.category} />

      <DynamicSelect
        labelText="Select Supervisor"
        emptyText="No supervisor with this name."
        items={supervisors || []}
        value={formState.supervisor || ""}
        onChange={(value) => onChange("supervisor", value)}
      />
      <ErrorMessage message={errors.supervisor} />
    </div>
  );
}
