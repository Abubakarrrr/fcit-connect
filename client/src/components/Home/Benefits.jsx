import { Card, CardContent } from "@/components/ui/card"
import a from '../../assets/Home/3.png'
import b from '../../assets/Home/1.webp'
import c from '../../assets/Home/2.webp'
export default function BenefitsSection() {
  const steps = [
    {
      number: 1,
      title: "Escape tutorial hell",
      description: "Discover what others have worked on and learn from their success.",
      image: a,
    },
    {
      number: 2,
      title: "From Concept to Recognition",
      description: "Spot issues instantly and address them with precise metrics for optimized performance.",
      image: b,
    },
    {
      number: 3,
      title: "Predictive Analysis Tool",
      description: "Get personalized insights with our Predictive Analysis Tool to evaluate your project idea",
      image: c,
    },
  ]

  return (
  <div className="py-8 md:px-8">
    <div className="max-w-5xl mx-auto">
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="">
            <div className="flex items-center justify-center max-md:flex-col gap-4">
              {/* Left section: Content */}
              <div className="md:w-1/2 w-full flex justify-center">
                <div className="p-6 max-md:text-center">
                  <h3 className="text-4xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              </div>

              {/* Right section: Image */}
              <div className="md:w-1/2 h-[200px] md:h-[300px] w-full flex justify-center">
                <img src={step.image} alt={step.title} className="h-full object-cover object-center" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}

