import { useCallback } from 'react'
import useDeleteProject from '../../../hooks/useDeleteProject'

export default ({ projectId, onSearch }) => {
  const { active: activeDelete, handleDelete } = useDeleteProject(projectId)

  const handleSearchChange = useCallback(txt => onSearch && onSearch(txt), [onSearch])
  const handleSearchShowHide = useCallback(() => handleSearchChange(''), [handleSearchChange])

  return {
    activeDelete,
    handleDelete,
    handleSearchChange,
    handleSearchShow: handleSearchShowHide,
    handleSearchHide: handleSearchShowHide,
  }
}
