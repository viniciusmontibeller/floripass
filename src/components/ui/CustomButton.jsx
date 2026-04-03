import { StyleSheet, Text, Pressable } from 'react-native'

export default function CustomButton({ text, type = 'primary', buttonStyle, textStyle, ...props }) {
    const variants = ['primary', 'secondary', 'accent']
    const safeType = variants.includes(type) ? type : 'primary'

    const buttonVariant = styles[`${safeType}Button`]
    const textVariant = styles[`${safeType}ButtonText`]

    return (
        <Pressable
            style={[buttonVariant, buttonStyle]}
            {...props}
        >
            <Text
                style={[textVariant, textStyle]}

            >{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: '#0284C7',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    secondaryButtonText: {
        color: '#0F172A',
        fontSize: 15,
        fontWeight: '600',
    },
    accentButton: {
        backgroundColor: '#0F172A',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
    },
    accentButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
})