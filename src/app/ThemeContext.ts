import { createContext } from 'react';
import { Theme } from '@mui/material/styles'; 

export const ThemeContext = createContext<Theme | null>(null);