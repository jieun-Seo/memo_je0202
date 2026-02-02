import { useState } from "react"; 
import type { MemoItemProps } from "../types";

function MemoItem({ memo, onUpdateMemo, onDeleteMemo }: MemoItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(memo.content);

    const handleEdit = () => {
        setIsEditing(true);
        setEditContent(memo.content); 
    };

    const handleSave = () => {
        const trimmedContent = editContent.trim();
        if (!trimmedContent) {
            alert("메모 내용을 입력해주세요.");
            return;
        }

        onUpdateMemo(memo.id, trimmedContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditContent(memo.content); 
    };

    const handleDelete = () => {
        if (window.confirm("정말 이 메모를 삭제하시겠습니까?")) {
            onDeleteMemo(memo.id);
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditContent(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div className="memo-item">
                <textarea
                    className="edit-input"
                    value={editContent}
                    onChange={handleContentChange}
                    onKeyDown={handleKeyDown}
                    autoFocus // 자동으로 포커스
                />
                <p className="memo-date">Ctrl+Enter로 저장, Esc로 취소</p>
                <div className="memo-actions">
                    <button className="save-button" onClick={handleSave}>
                        저장
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                        취소
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="memo-item">
            <p className="memo-content">{memo.content}</p>
            <p className="memo-date">
                {new Date(memo.createdAt).toLocaleString("ko-KR")}
                {memo.updatedAt !== memo.createdAt && <span> (수정됨)</span>}
            </p>
            <div className="memo-actions">
                <button className="edit-button" onClick={handleEdit}>
                    수정
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
}

export default MemoItem;
