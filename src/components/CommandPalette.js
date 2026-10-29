import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import Modal from "./Modal";

export default function CommandPalette({ commands, onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const list = useRef(null);
  const matches = commands.filter((command) =>
    `${command.label} ${command.group} ${command.keywords || ""}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView?.({ block: "nearest" });
  }, [selected]);
  function run(command) {
    if (!command) return;
    onClose();
    requestAnimationFrame(() => command.action());
  }
  function handleKeys(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setSelected((current) => matches.length ? (current + delta + matches.length) % matches.length : 0);
    }
    if (event.key === "Enter" && event.target.tagName === "INPUT") {
      event.preventDefault(); run(matches[selected]);
    }
  }
  return (
    <Modal title="Command palette" onClose={onClose} className="command-modal" onKeyDown={handleKeys}>
      <div className="command-search">
        <Search size={22} aria-hidden="true" />
        <input data-initial-focus role="combobox" aria-label="Search commands"
          aria-autocomplete="list" aria-expanded="true" aria-controls="command-results"
          aria-activedescendant={matches.length ? `command-${selected}` : undefined}
          placeholder="Where would you like to go?" value={query}
          onChange={(event) => { setQuery(event.target.value); setSelected(0); }} />
        <kbd>esc</kbd>
      </div>
      <div id="command-results" role="listbox" aria-label="Available commands" ref={list} className="command-results">
        {matches.map((command, index) => (
          <button role="option" aria-selected={selected === index} tabIndex={-1}
            id={`command-${index}`} key={command.label} onClick={() => run(command)}
            onMouseMove={() => setSelected(index)}>
            <span><small>{command.group}</small>{command.label}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      {!matches.length && <p className="command-empty" role="status">No matching commands. Try “work”, “CV”, or “theme”.</p>}
      <div className="command-footer mono"><span>↑ ↓ to explore</span><span>↵ to select</span><span>esc to close</span></div>
    </Modal>
  );
}
