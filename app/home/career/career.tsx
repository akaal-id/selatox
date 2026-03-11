import { CareerCard } from "@/components/ui/CareerCard";
import { Button } from "@/components/ui/Button";
import styles from "./career.module.css";

const careerData = [
  {
    title: "Digital Marketing Specialist",
    location: "Jakarta, ID",
    type: "Full-Time",
    department: "Marketing & Strategy"
  },
  {
    title: "HR & Talent Acquisition Manager",
    location: "Jakarta, ID",
    type: "Full-Time",
    department: "Human Resources"
  },
  {
    title: "Senior Clinical Researcher",
    location: "Global / Remote",
    type: "Full-Time",
    department: "Research & Development"
  },
];

export function CareerSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.eyebrow}>Careers</span>
            <h2 className={styles.title}>Join Our Clinical & Corporate Teams.</h2>
          </div>
          <div className={styles.actionArea}>
            <Button variant="simple" showIcon={true} color="var(--neutral-140)">
              View All Roles
            </Button>
          </div>
        </div>
        <div className={styles.grid}>
          {careerData.map((job, index) => (
            <CareerCard
              key={index}
              title={job.title}
              location={job.location}
              type={job.type}
              department={job.department}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
