import supabase from './supabaseService';

export const uploadFile = async (file, folder = '') => {
  try {
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('smartflow-files') // Nome del bucket
      .upload(fileName, file);

    if (error) throw error;

    const { publicUrl } = supabase.storage
      .from('smartflow-files')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Errore durante il caricamento su Supabase:', error.message);
    throw error;
  }
};
