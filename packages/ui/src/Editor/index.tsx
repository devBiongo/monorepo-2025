import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, List, ListItemButton, ListItemText } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import { mockFileContents, mockFiles } from './mockData';

export default function App() {
  const [currentFile, setCurrentFile] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [readonly, setReadonly] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // 选择文件并更新内容、语言和只读状态
  const handleSelectFile = (file: string) => {
    const data = mockFileContents[file];
    if (data) {
      setCurrentFile(file);
      setContent(data.content);
      setLanguage(data.lang);
      setReadonly(!!data.readonly);
    }
  };

  // 保存文件（这里只是模拟）
  const handleSave = () => {
    console.log(`[保存] ${currentFile} 内容:`, content);
    alert('模拟保存成功，已打印到控制台');
  };

  // 监听 ESC 键退出全屏
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && fullscreen) {
        // 退出全屏的操作
        setFullscreen(false);
        if (document.exitFullscreen) {
          document.exitFullscreen(); // 退出浏览器全屏
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 清理事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreen]);

  // 处理全屏按钮点击
  const handleFullscreenToggle = () => {
    setFullscreen((prev) => {
      const newFullscreen = !prev;
      if (newFullscreen) {
        // 进入浏览器全屏
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      } else {
        // 退出浏览器全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      return newFullscreen;
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', p: fullscreen ? 0 : 2, gap: 2 }}>
      {/* 只在非全屏时显示文件列表 */}
      {!fullscreen && (
        <Paper
          elevation={1}
          sx={{
            width: 240,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#fff',
            p: 1
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            文件列表
          </Typography>
          <List dense>
            {mockFiles.map((file) => (
              <ListItemButton
                key={file}
                onClick={() => handleSelectFile(file)}
                selected={file === currentFile}
                sx={{ borderRadius: 1 }}
              >
                <ListItemText primary={file} primaryTypographyProps={{ fontSize: 14 }} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}

      {/* 右侧区域 */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: fullscreen ? 0 : 2
        }}
      >
        {/* 只在非全屏时显示工具栏 */}
        {!fullscreen && (
          <Paper
            elevation={1}
            sx={{
              height: 48,
              display: 'flex',
              alignItems: 'center',
              px: 2,
              bgcolor: '#fff'
            }}
          >
            <Button variant="contained" onClick={handleSave}>
              保存
            </Button>
            <Typography sx={{ ml: 2 }} color="text.secondary">
              {currentFile || '未选择文件'}
            </Typography>
            <Button
              sx={{ ml: 'auto' }}
              onClick={handleFullscreenToggle}
              startIcon={fullscreen ? <FullscreenExit /> : <Fullscreen />}
            >
              {fullscreen ? '退出全屏' : '全屏编辑'}
            </Button>
          </Paper>
        )}

        {/* 编辑器区域 */}
        {/* 编辑器区域 */}
        <Paper
          elevation={1}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            bgcolor: fullscreen ? '#1e1e1e' : '#fff'
          }}
        >
          {/* 面包屑导航栏 */}
          <Box
            sx={{
              height: 32,
              display: 'flex',
              alignItems: 'center',
              px: 1.5,
              fontSize: 12,
              fontFamily: 'monospace',
              color: fullscreen ? '#ccc' : 'text.secondary',
              bgcolor: fullscreen ? '#2d2d2d' : '#fff'
              // borderBottom: fullscreen ? "1px solid #444" : "1px solid #ddd",
            }}
          >
            <Box component="span" sx={{ mr: 0.5 }}>
              📁
            </Box>
            <Box component="span" sx={{ mr: 0.5 }}>
              mock
            </Box>
            <Box component="span" sx={{ mx: 0.5 }}>
              {'>'}
            </Box>
            <Box component="span" sx={{ mr: 0.5 }}>
              📄
            </Box>
            <Box component="span">{currentFile || '未选择文件'}</Box>
          </Box>

          {/* Monaco 编辑器 */}
          <Box sx={{ flexGrow: 1 }}>
            <Editor
              height="100%"
              language={language}
              value={content}
              onChange={(val) => {
                if (!readonly) {
                  setContent(val || '');
                }
              }}
              theme={fullscreen ? 'vs-dark' : 'vs-light'}
              options={{
                readOnly: readonly,
                fontSize: 14,
                minimap: { enabled: !fullscreen },
                automaticLayout: true
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
