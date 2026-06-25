import styles from "@/components/admin/cms/cms-form.module.css";

export default function AdminLoading() {
  return (
    <div className={styles.editorLoading} aria-busy="true" aria-label="Loading content">
      <div className={styles.editorLoadingBar} />
      <div className={styles.editorLoadingBlock} />
      <div className={styles.editorLoadingBlock} />
    </div>
  );
}
