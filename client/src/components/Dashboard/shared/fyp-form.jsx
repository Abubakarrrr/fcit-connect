import { FormInput } from "./form-input";
import { FormTextarea } from "./form-textarea";
import DynamicSelect from "./SelectWithSearch";
import SimpleSelect from "./SimpleSelect";

const categories = [
    "Artificial Intelligence",
    "Blockchain",
    "Web Development",
    "Mobile Development",
    "Desktop Applications",
    "Cloud Computing",
    "Internet of Things (IoT)",
    "Game Development",
    "Data Science",
    "Cybersecurity",
  ];
  
const departments = ["Computer Science", "Information Technology", "Software Engineering", "Data Science"];
const supervisors = ["Dr. Smith", "Prof. Johnson", "Dr. Brown", "Prof. Taylor", "Dr. Anderson"];
const years = Array.from({ length: 2024 - 2019 + 1 }, (_, i) => (2024 - i).toString());


export default function FypForm({ onSubmit, errors = {} }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormInput
        id="templateName"
        label="Name of your FYP"
        placeholder="Enter FYP name"
        error={errors.templateName}
      />

      <FormTextarea
        id="description"
        label="FYP Description"
        placeholder="Enter FYP description"
        error={errors.description}
      />

      <div className="grid grid-cols-2 gap-4">
        <SimpleSelect labelText="Select Campus" placeholderText="Select Campus" items={["NC", "OC"]} />
        <SimpleSelect labelText="Select Department" placeholderText="Select Department" items={departments} />
        <SimpleSelect labelText="Select Year" placeholderText="Select Year" items={years} />
        
      </div>

      {/* <div className="grid grid-cols-2 gap-4"> */}
      <FormInput
        id="deployedLink"
        label="FYP deployed Link"
        placeholder="https://fcit-connect.vercel.app"
        error={errors.deployedLink}
      />
      <FormInput
        id="githubLink"
        label="Github Link"
        placeholder="https://github.com/Abubakarrrr/fcit-connect"
        error={errors.githubLink}
      />
      {/* </div> */}
      <FormInput
        id="figmaLink"
        label="Figma Link"
        placeholder="https://www.figma.com"
        error={errors.figmaLink}
      />

      <div className="space-y-2">
        <DynamicSelect
          labelText="Select Category"
          emptyText="No categories"
          items={categories}
        />
         <DynamicSelect
          labelText="Select Supervisor"
          emptyText="No supervisor with this name."
          items={supervisors}
        />
      </div>
    </form>
  );
}
