import { ViewSourceFeature } from "./features/view_source.feature";
import { SaveTemplate } from "./features/save_template.feature";

export function FeatureMap(editor) {
    ViewSourceFeature(editor);
    SaveTemplate(editor, window.pageId);
}