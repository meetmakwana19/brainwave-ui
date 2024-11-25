import { JsonRTE, RichTextEditor } from "@contentstack/venus-components";
import React, { useState } from "react";

const Editor: React.FC = () => {
  const [editorContent, setEditorContent] = useState<any>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipOptions, setTooltipOptions] = useState<any>([]);

  const handleContentChange = (content: any) => {
    console.log("Editor content updated:", content);

    // setEditorContent(content);
  };

  const handleSlashCommand = (command: string) => {
    alert(`Selected command: ${command}`);

    // Simulate API call to fetch suggestions or AI response
    if (command.startsWith("/")) {
      setShowTooltip(true);
      setTooltipOptions(["Suggestion 1", "Suggestion 2", "Generate Text"]);
    } else {
      setShowTooltip(false);
    }
  };

  const handleCommandSelect = async (command: string) => {
    setShowTooltip(false);


    // Fetch AI response
    const response = await fetchAIResponse(command);
    if (response) {
      // Add AI response to editor content
      const updatedContent = [...editorContent, { text: response }];
      setEditorContent(updatedContent);
    }
  };

  return (
    <div>
      <JsonRTE onChange={handleContentChange} onSlashCommand={handleSlashCommand} />
      {/* <RichTextEditor onChange={handleContentChange} onSlashCommand={handleSlashCommand} /> */}
      {showTooltip && (
        <div className="tooltip">
          {tooltipOptions.map((option: any) => (
            <div
              key={option}
              onClick={() => handleCommandSelect(option)}
              className="tooltip-option"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Editor;

async function fetchAIResponse(command: string): Promise<string> {
  // Simulate API call to fetch AI response
  return `Generated response for ${command}`;
}
