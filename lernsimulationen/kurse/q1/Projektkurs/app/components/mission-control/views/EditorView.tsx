import type { PerspectiveId } from "../../../types";
import type { MissionController } from "../useMissionControl";

export function EditorView({
  controller,
}: {
  controller: MissionController;
}) {
  const {
    course,
    setEditingChapterId,
    editingChapter,
    courseInputRef,
    exportCourse,
    addChapter,
    removeChapter,
    updateChapter,
    updateCourseDetails,
  } = controller;

  return (
    <div className="editor-layout">
      <section className="editor-intro">
        <div>
          <span className="section-kicker">GRAFISCHER KURSEDITOR</span>
          <h2>Kurswerkstatt</h2>
          <p>
            Änderungen gelten sofort für diese Sitzung. Exportiere die
            Kursdatei, um sie dauerhaft zu sichern.
          </p>
        </div>
        <div className="editor-actions">
          <button
            className="button secondary"
            type="button"
            onClick={() => courseInputRef.current?.click()}
          >
            Kurs importieren
          </button>
          <button className="button primary" type="button" onClick={exportCourse}>
            Kurs exportieren
          </button>
        </div>
      </section>

      <section className="panel course-basics">
        <label>
          Kurstitel
          <input
            value={course.title}
            onChange={(event) =>
              updateCourseDetails({ title: event.target.value })
            }
          />
        </label>
        <label>
          Untertitel
          <input
            value={course.subtitle}
            onChange={(event) =>
              updateCourseDetails({ subtitle: event.target.value })
            }
          />
        </label>
        <label className="wide-field">
          Story-Einstieg
          <textarea
            rows={4}
            value={course.storyIntro}
            onChange={(event) =>
              updateCourseDetails({ storyIntro: event.target.value })
            }
          />
        </label>
      </section>

      <section className="chapter-editor">
        <div className="chapter-list panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">STRUKTUR</span>
              <h3>{course.chapters.length} Kapitel</h3>
            </div>
            <button
              className="icon-button"
              type="button"
              onClick={addChapter}
              aria-label="Kapitel hinzufügen"
            >
              +
            </button>
          </div>
          <div className="editor-chapters">
            {[...course.chapters]
              .sort((a, b) => a.order - b.order)
              .map((chapter) => (
                <button
                  type="button"
                  key={chapter.id}
                  className={
                    editingChapter?.id === chapter.id ? "selected" : ""
                  }
                  onClick={() => setEditingChapterId(chapter.id)}
                >
                  <span>{String(chapter.order).padStart(2, "0")}</span>
                  <strong>{chapter.title}</strong>
                  <i className={`legend-dot ${chapter.perspective}`} />
                </button>
              ))}
          </div>
        </div>

        {editingChapter && (
          <div className="panel editor-form">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">
                  KAPITEL {String(editingChapter.order).padStart(2, "0")}
                </span>
                <h3>{editingChapter.title}</h3>
              </div>
              <button
                className="text-action danger"
                type="button"
                onClick={() => removeChapter(editingChapter.id)}
              >
                Entfernen
              </button>
            </div>
            <div className="form-grid">
              <label>
                Titel
                <input
                  value={editingChapter.title}
                  onChange={(event) =>
                    updateChapter(editingChapter.id, {
                      title: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Codename
                <input
                  value={editingChapter.codename}
                  onChange={(event) =>
                    updateChapter(editingChapter.id, {
                      codename: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Perspektive
                <select
                  value={editingChapter.perspective}
                  onChange={(event) =>
                    updateChapter(editingChapter.id, {
                      perspective: event.target.value as PerspectiveId,
                    })
                  }
                >
                  {course.perspectives.map((perspective) => (
                    <option key={perspective.id} value={perspective.id}>
                      {perspective.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Erfahrungspunkte
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={editingChapter.xp}
                  onChange={(event) =>
                    updateChapter(editingChapter.id, {
                      xp: Number(event.target.value),
                    })
                  }
                />
              </label>
              <label className="wide-field">
                Kurzbeschreibung
                <input
                  value={editingChapter.teaser}
                  onChange={(event) =>
                    updateChapter(editingChapter.id, {
                      teaser: event.target.value,
                    })
                  }
                />
              </label>
              <label className="wide-field">
                Story-Briefing
                <textarea
                  rows={5}
                  value={editingChapter.briefing}
                  onChange={(event) =>
                    updateChapter(editingChapter.id, {
                      briefing: event.target.value,
                    })
                  }
                />
              </label>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
