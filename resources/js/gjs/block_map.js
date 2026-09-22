import { Container } from "./blocks/container.block";
import { Section } from "./blocks/section.block";
import { Div } from "./blocks/div.block";
import { Layout2Cols } from "./blocks/layout_2_cols.block";
import { Layout3Cols } from "./blocks/layout_3_cols.block";
import { Layout4Cols } from "./blocks/layout_4_cols.block";
import { SidebarLeft } from "./blocks/sidebar_left.block";
import { Grid } from "./blocks/grid.block";
import { Spacer } from "./blocks/spacer.block";
import { Divider } from "./blocks/divider.block";

import { Text } from "./blocks/text.block";
import { Heading } from "./blocks/heading.block";
import { Link } from "./blocks/link.block";
import { Image } from "./blocks/image.block";
import { Video } from "./blocks/video.block";
import { Map } from "./blocks/map.block";
import { Iframe } from "./blocks/iframe.block";
import { Icon } from "./blocks/icon.block";

import { Form } from "./blocks/form.block";
import { Input } from "./blocks/input.block";
import { Label } from "./blocks/label.block";
import { Select } from "./blocks/select.block";
import { Checkbox } from "./blocks/checkbox.block";
import { Radio } from "./blocks/radio.block";
import { Textarea } from "./blocks/textarea.block";
import { SubmitButton } from "./blocks/submit_button.block";
import { InputFile } from "./blocks/input_file.block";

import { CustomCode } from "./blocks/custom_code.block";
import { Accordion } from "./blocks/accordion.block";
import { Slider } from "./blocks/slider.block";

export function BlockMap(editor) {
    let layoutName = 'Bố cục (Layout)';
    let formName = 'Biểu mẫu (Form)';
    let contentMediaName = 'Nội dung & Hiển thị (Content & Media)';
    let advancedName = 'Thành phần nâng cao (Advanced / Interactive)';

    Container(editor, layoutName);
    Section(editor, layoutName);
    Div(editor, layoutName);
    Layout2Cols(editor, layoutName);
    Layout3Cols(editor, layoutName);
    Layout4Cols(editor, layoutName);
    SidebarLeft(editor, layoutName);
    Grid(editor, layoutName);
    Spacer(editor, layoutName);
    Divider(editor, layoutName);

    Text(editor, contentMediaName);
    Heading(editor, contentMediaName);
    Link(editor, contentMediaName);
    Image(editor, contentMediaName);
    Video(editor, contentMediaName);
    Map(editor, contentMediaName);
    Iframe(editor, contentMediaName);
    Icon(editor, contentMediaName);

    Form(editor, formName);
    Label(editor, formName);
    Input(editor, formName);
    Select(editor, formName);
    Checkbox(editor, formName);
    Radio(editor, formName);
    Textarea(editor, formName);
    SubmitButton(editor, formName);
    InputFile(editor, formName);
    
    CustomCode(editor, advancedName);
    Accordion(editor, advancedName);
    Slider(editor, advancedName);
}